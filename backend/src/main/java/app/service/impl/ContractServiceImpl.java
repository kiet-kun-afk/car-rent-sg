package app.service.impl;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.dto.CarDTO;
import app.dto.ContractDTO;
import app.exception.DataNotFoundException;
import app.exception.InvalidParamException;
import app.model.Car;
import app.model.Contract;
import app.model.Customer;
import app.model.Staff;
import app.repository.CarRepository;
import app.repository.ContractRepository;
import app.response.ContractResponse;
import app.service.ContractService;
import app.service.CustomerService;
import app.service.StaffService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

    private final CustomerService customerService;
    private final StaffService staffService;
    private final FileService fileService;
    private final FormatterService formatterService;
    private final ContractRepository contractRepository;
    private final CarRepository carRepository;
    private final EmailService emailService;

    @Override
    public ContractResponse createContract(String registrationPlate, ContractDTO contractDTO) throws Exception {

        Customer customer = customerService.getAuth();

        Car car = carRepository.findByRegistrationPlateAndStatusTrue(registrationPlate);
        if (car == null) {
            throw new DataNotFoundException("Car not found");
        }

        LocalDateTime startDate = contractDTO.getStartDate();
        LocalDateTime endDate = contractDTO.getEndDate();

        if (!formatterService.isFuture(startDate) || !formatterService.isFuture(endDate)) {
            throw new InvalidParamException("Start/End date must be future");
        }

        if (!formatterService.isBefore(startDate, endDate)) {
            throw new InvalidParamException("Start date must be before end date");
        }

        if (!isContractValidForCar(car, startDate, endDate)) {
            throw new InvalidParamException("Contract is not valid for car: is overlapping date");
        }

        Double rentCost = car.getRentCost();

        long numberDay = daysBetween(startDate, endDate) + 1;

        Double totalRentCost = (Double) (numberDay * rentCost);

        Contract contract = new Contract();
        contract.setCustomer(customer);
        contract.setCar(car);
        contract.setCreateDate(LocalDateTime.now());
        contract.setStartDate(startDate);
        contract.setEndDate(endDate);
        contract.setRentCost(rentCost);
        contract.setNumberDay(numberDay);
        contract.setTotalRentCost(totalRentCost);
        contract.setDeposit(contractDTO.getDeposit());
        contract.setStatusPayment(true);
        contract.setWayToPay(contractDTO.getWayToPay());
        contract.setAttachment(fileService.upload(contractDTO.getFile()));
        contractRepository.save(contract);
        return ContractResponse.fromContract(contract);
    }

    private long daysBetween(LocalDateTime startDate, LocalDateTime endDate)
            throws Exception {
        try {
            return ChronoUnit.DAYS.between(startDate, endDate);
        } catch (Exception e) {
            throw new InvalidParamException("Date type is invalid");
        }
    }

    public boolean isContractValidForCar(Car car, LocalDateTime startDate, LocalDateTime endDate) {
        List<Contract> contractList = contractRepository.findByRegistrationPlate(car.getRegistrationPlate());

        for (Contract contract : contractList) {
            if (isDateOverlap(contract.getStartDate(), contract.getEndDate(), startDate, endDate)) {
                return false; // is overlapping
            }
        }
        return true; // is not overlapping
    }

    public boolean isContractValidForCarExcludingCurrent(Car car, LocalDateTime startDate,
            LocalDateTime endDate, Integer currentContractId) {
        List<Contract> contractList = contractRepository.findByRegistrationPlateExcludingContractId(
                car.getRegistrationPlate(),
                currentContractId);

        for (Contract contract : contractList) {
            if (isDateOverlap(contract.getStartDate(), contract.getEndDate(), startDate, endDate)) {
                return false; // is overlapping
            }
        }
        return true; // is not overlapping
    }

    private boolean isDateOverlap(LocalDateTime existingStart, LocalDateTime existingEnd, LocalDateTime newStart,
            LocalDateTime newEnd) {
        return !newStart.isAfter(existingEnd) && !newEnd.isBefore(existingStart);
    }

    @Override
    public ContractResponse updateContract(Integer contractId, ContractDTO contractDTO) throws Exception {
        Customer customer = customerService.getAuth();
        Contract contract = contractRepository.findByContractIdAndCustomerId(contractId, customer.getCustomerId());
        if (contract == null) {
            throw new DataNotFoundException("Contract not found or not belong to customer");
        }

        LocalDateTime startDate = contractDTO.getStartDate();
        LocalDateTime endDate = contractDTO.getEndDate();

        if (!formatterService.isFuture(startDate) || !formatterService.isFuture(endDate)) {
            throw new InvalidParamException("Start/End date must be future");
        }

        if (!formatterService.isBefore(startDate, endDate)) {
            throw new InvalidParamException("Start date must be before end date");
        }

        if (!isContractValidForCarExcludingCurrent(contract.getCar(), startDate, endDate,
                contractId)) {
            throw new InvalidParamException("Contract is not valid for car: is overlapping date");
        }

        Double rentCost = contract.getCar().getRentCost();

        long numberDay = daysBetween(startDate, endDate) + 1;

        Double totalRentCost = (Double) (numberDay * rentCost);
        contract.setStartDate(startDate);
        contract.setEndDate(endDate);
        contract.setRentCost(rentCost);
        contract.setNumberDay(numberDay);
        contract.setTotalRentCost(totalRentCost);
        contract.setWayToPay(contractDTO.getWayToPay());
        contract.setAttachment(fileService.upload(contractDTO.getFile()));
        contractRepository.save(contract);
        return ContractResponse.fromContract(contract);
    }

    @Override
    public void deleteContract(Integer contractId) throws Exception {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new DataNotFoundException("Contract not found"));
        contractRepository.delete(contract);
    }

    @Transactional
    private void continueContract(Contract contract) throws Exception {
        emailService.sendMail(contract.getCustomer().getEmail(), "Gửi yêu cầu thuê xe",
                "Bạn vừa gửi yêu cầu thuê xe "
                        + contract.getCar().getCarName()
                        + ", vui lòng tiến hành đặt cọc ngay tại đây "
                        + "{đường dẫn} "
                        + " để hoàn tất việc đặt xe, tổng cộng: "
                        + contract.getTotalRentCost()
                        + " tiền cọc: "
                        + contract.getTotalRentCost() * 0.2
                        + "(20%) tổng tiền");
    }

    @Override
    public void confirmContract(Integer contractId) throws Exception {
        try {
            Staff staff = staffService.getAuth();
            Contract contract = contractRepository.findByContractIdAndNoStaff(contractId);
            contract.setStaff(staff);
            contractRepository.save(contract);
            continueContract(contract);
        } catch (Exception e) {
            throw new DataNotFoundException("The contract has been confirmed or something is wrong");
        }
    }

    @Override
    public void completePayContract(Integer contractId, Double deposit) throws Exception {
        if (deposit <= 0) {
            throw new InvalidParamException("Deposit must be positive");
        }
        try {
            Contract contract = contractRepository.findByContractIdAndConfirmed(contractId);
            contract.setDeposit(deposit);
            contractRepository.save(contract);
        } catch (Exception e) {
            throw new DataNotFoundException("The contract has not been confirmed or something is wrong");
        }
    }

    @Override
    public List<ContractResponse> getAllContract() {
        List<Contract> contracts = contractRepository.findAll();
        return contracts.stream().map(ContractResponse::fromContract).toList();
    }

    @Override
    public List<ContractResponse> getAllContractByCustomer(String phoneNumber) {
        List<Contract> contracts = contractRepository.findByCustomerPhoneNumber(phoneNumber);
        return contracts.stream().map(ContractResponse::fromContract).toList();
    }

    @Override
    public List<ContractResponse> getAllContractByStaff(String email) {
        List<Contract> contracts = contractRepository.findByStaffEmail(email);
        return contracts.stream().map(ContractResponse::fromContract).toList();
    }

    @Override
    public List<ContractResponse> getAllContractByCar(String registrationPlate) {
        List<Contract> contractList = contractRepository.findByRegistrationPlate(registrationPlate);
        return contractList.stream().map(ContractResponse::fromContract).toList();
    }

    @Override
    public List<ContractResponse> listContractByPhoneNumberNotDeliveryYet(String phoneNumber) {
        List<Contract> contracts = contractRepository.findContractsWithoutDeliveryRecordsByPhoneNumber(phoneNumber);
        return contracts.stream().map(ContractResponse::fromContract).toList();
    }

    @Override
    public List<ContractResponse> listContractNotDeliveryYet() {
        List<Contract> contracts = contractRepository.findContractsWithoutDeliveryRecords();
        return contracts.stream().map(ContractResponse::fromContract).toList();
    }

    @Override
    public List<ContractResponse> listContractStatusPaymentTrue() {
        // TODO Auto-generated method stub
        List<Contract> contract = contractRepository.findAllByStatusPaymentTrue();
        return contract.stream().map(ContractResponse::fromContract).toList();
    }

    @Override
    public long countContractsByStatusPaymentTrue() {
        // TODO Auto-generated method stub
        return contractRepository.countContractsByStatusPaymentTrue();
    }

    @Override
    public CarDTO getMostRentedCar() {
        // TODO Auto-generated method stub
        List<CarDTO> cars = contractRepository.findMostRentedCars();
        if (!cars.isEmpty()) {
            return cars.get(0); // Lấy xe đầu tiên từ danh sách
        }
        return null;

    }

    @Override
    public ContractResponse findContractById(Integer contractId) {
        // TODO Auto-generated method stub
        Contract contract = contractRepository.findById(contractId).orElse(null);
        return ContractResponse.fromContract(contract);
    }

    @Override
    public void UpdateStatusPayment(Integer contractId) throws Exception {
        Contract contract = contractRepository.findByContractIdAndStatusPaymentTrue(contractId);

        if (contract == null) {
            throw new DataNotFoundException("Contract not found or not belong to customer");
        } else {
            contract.setStatusPayment(true);
            contractRepository.save(contract);
        }

    }

}

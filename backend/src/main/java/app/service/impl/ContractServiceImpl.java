package app.service.impl;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;

import app.dto.ContractDTO;
import app.exception.DataNotFoundException;
import app.exception.InvalidParamException;
import app.model.Car;
import app.model.Contract;
import app.model.Customer;
import app.repository.CarRepository;
import app.repository.ContractRepository;
import app.response.ContractResponse;
import app.service.ContractService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

    private final CustomerServiceImpl customerService;
    private final FileService fileService;
    private final FormatterService formatterService;
    private final ContractRepository contractRepository;
    private final CarRepository carRepository;

    @Override
    public ContractResponse createContract(String registrationPlate, ContractDTO contractDTO) throws Exception {
        Customer customer = customerService.getAuth();
        LocalDateTime createDate = formatterService.stringToDateTime(contractDTO.getCreateDate());
        LocalDateTime startDate = formatterService.stringToDateTime(contractDTO.getStartDate());
        LocalDateTime endDate = formatterService.stringToDateTime(contractDTO.getEndDate());

        Car car = carRepository.findByRegistrationPlateAndStatusTrue(registrationPlate);
        if (car == null) {
            throw new DataNotFoundException("Car not found");
        }

        Double rentCost = car.getRentCost();

        long numberDay = daysBetween(startDate, endDate);

        Double totalRentCost = (Double) (numberDay * rentCost);

        Contract contract = new Contract();
        contract.setCustomer(customer);
        contract.setCar(car);
        contract.setCreateDate(createDate);
        contract.setStartDate(startDate);
        contract.setEndDate(endDate);
        contract.setRentCost(rentCost);
        contract.setNumberDay(numberDay);
        contract.setTotalRentCost(totalRentCost);
        contract.setDeposit(contractDTO.getDeposit());
        contract.setStatusPayment(true);
        contract.setWayToPay(contractDTO.getWayToPay());
        contract.setAttachment(fileService.saveAttachment(contractDTO.getFile()));
        contractRepository.save(contract);
        return ContractResponse.fromContract(contract);
    }

    private long daysBetween(LocalDateTime startDate, LocalDateTime endDate) throws Exception {
        try {
            return ChronoUnit.DAYS.between(startDate, endDate);
        } catch (Exception e) {
            throw new InvalidParamException("Date type is invalid");
        }
    }

    @Override
    public ContractResponse updateContract(ContractDTO contractDTO) throws Exception {

        throw new UnsupportedOperationException("Unimplemented method 'updateContract'");
    }

    @Override
    public void deleteContract(Integer contractId) throws Exception {

        throw new UnsupportedOperationException("Unimplemented method 'deleteContract'");
    }

    @Override
    public void confirmContract(Integer contractId) throws Exception {

        throw new UnsupportedOperationException("Unimplemented method 'confirmContract'");
    }

    @Override
    public void completePayContract(Integer contractId) throws Exception {

        throw new UnsupportedOperationException("Unimplemented method 'completePayContract'");
    }

    @Override
    public List<ContractResponse> getAllContract() {

        throw new UnsupportedOperationException("Unimplemented method 'getAllContract'");
    }

    @Override
    public List<ContractResponse> getAllContractByCustomerId(Integer customerId) {

        throw new UnsupportedOperationException("Unimplemented method 'getAllContractByCustomerId'");
    }

    @Override
    public List<ContractResponse> getAllContractByStaffId(Integer staffId) {

        throw new UnsupportedOperationException("Unimplemented method 'getAllContractByStaffId'");
    }

}

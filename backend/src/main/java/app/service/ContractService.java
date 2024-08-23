package app.service;

import java.util.List;

import app.dto.CarDTO;
import app.dto.ContractDTO;
import app.response.ContractResponse;

public interface ContractService {

    public ContractResponse createContract(String registrationPlate, ContractDTO contractDTO) throws Exception;

    public ContractResponse updateContract(Integer contractId, ContractDTO contractDTO) throws Exception;

    public void deleteContract(Integer contractId) throws Exception;

    public void confirmContract(Integer contractId) throws Exception;

    public void completePayContract(Integer contractId, long deposit, String wayTopay, String type) throws Exception;

    public List<ContractResponse> getAllContract();

    public List<ContractResponse> getAllContractByCustomer(String phoneNumber);

    public List<ContractResponse> getAllContractByStaff(String email);

    public List<ContractResponse> getAllContractByCar(String registrationPlate);

    public List<ContractResponse> listContractByPhoneNumberNotDeliveryYet(String phoneNumber);

    public List<ContractResponse> listContractNotDeliveryYet();

    public List<ContractResponse> listContractStatusPaymentTrue();

    public List<ContractResponse> listCustomerTrip() throws Exception;

    // đếm số lượng contract status true
    public long countContractsByStatusPaymentTrue();

    // xe được thuê nhiều nhất
    public CarDTO getMostRentedCar();

    public ContractResponse getContractById(Integer contractId) throws Exception;

    public ContractResponse findByContractId(Integer contractId);

    public List<ContractResponse> listRecentContracts(int limit);

    public void UpdateStatusPayment(Integer contractId, boolean status);

}

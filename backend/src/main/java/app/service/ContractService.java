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

    public void completePayContract(Integer contractId, Double deposit) throws Exception;

    public List<ContractResponse> getAllContract();

    public List<ContractResponse> getAllContractByCustomer(String phoneNumber);

    public List<ContractResponse> getAllContractByStaff(String email);

    public List<ContractResponse> getAllContractByCar(String registrationPlate);

    public List<ContractResponse> listContractByPhoneNumberNotDeliveryYet(String phoneNumber);

    public List<ContractResponse> listContractNotDeliveryYet();

    public List<ContractResponse> listContractStatusPaymentTrue();

    // đếm số lượng contract status true
    public long countContractsByStatusPaymentTrue();

    // xe được thuê nhiều nhất
    public CarDTO getMostRentedCar();

    // new 22/6

    public ContractResponse findContractById(Integer contractId);

    public void UpdateStatusPayment(Integer contractId) throws Exception;
}

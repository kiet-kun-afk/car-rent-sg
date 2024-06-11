package app.service;

import java.util.List;

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
}

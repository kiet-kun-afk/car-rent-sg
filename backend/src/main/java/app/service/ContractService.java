package app.service;

import java.util.List;

import app.dto.ContractDTO;
import app.response.ContractResponse;

public interface ContractService {

    public ContractResponse createContract(String registrationPlate, ContractDTO contractDTO) throws Exception;

    public ContractResponse updateContract(ContractDTO contractDTO) throws Exception;

    public void deleteContract(Integer contractId) throws Exception;

    public void confirmContract(Integer contractId) throws Exception;

    public void completePayContract(Integer contractId) throws Exception;

    public List<ContractResponse> getAllContract();

    public List<ContractResponse> getAllContractByCustomerId(Integer customerId);

    public List<ContractResponse> getAllContractByStaffId(Integer staffId);
}

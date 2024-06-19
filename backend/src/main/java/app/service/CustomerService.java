package app.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import app.dto.AddressDTO;
import app.dto.CustomerInformationRequest;
import app.dto.login.ChangePasswordDTO;
import app.dto.login.LoginDTO;
import app.dto.login.RegisterCustomerDTO;
import app.model.Customer;
import app.response.AddressResponse;
import app.response.CustomerResponse;
import app.response.LoginResponse;

public interface CustomerService {

    public LoginResponse loginCustomer(LoginDTO customer) throws Exception;

    public CustomerResponse registerCustomer(RegisterCustomerDTO customerDTO) throws Exception;

    public Customer getAuth() throws Exception;

    public CustomerResponse getOneByPhoneNumber(String phoneNumber) throws Exception;

    public List<CustomerResponse> getAllCustomer();

    public List<CustomerResponse> getAllAndStatusFalse();

    public List<CustomerResponse> getAllAndStatusTrue();

    public CustomerResponse updateCustomerInfo(CustomerInformationRequest customerInformationRequest) throws Exception;

    public CustomerResponse updateCustomerPhoneNumber(String phoneNumber) throws Exception;

    public CustomerResponse updateCustomerEmail(String Email) throws Exception;

    public CustomerResponse updateCustomerAvatar(MultipartFile avatar) throws Exception;

    public AddressResponse updateCustomerAddress(AddressDTO addressDTO) throws Exception;

    public void deleteCustomer(String phoneNumber) throws Exception;

    public void recoverCustomer(String phoneNumber) throws Exception;

    public void changePassword(ChangePasswordDTO changePasswordDTO) throws Exception;

    public CustomerResponse getCurrentCustomer() throws Exception;
}

package app.service;

import java.util.List;

import app.dto.CustomerDTO;
import app.dto.login.ChangePasswordDTO;
import app.dto.login.LoginDTO;
import app.dto.login.RegisterCustomerDTO;
import app.model.Customer;
import app.response.CustomerResponse;
import app.response.LoginResponse;

public interface CustomerService {

    public LoginResponse loginCustomer(LoginDTO customer) throws Exception;

    public CustomerResponse registerCustomer(RegisterCustomerDTO customerDTO) throws Exception;

    public Customer getAuth();

    public List<CustomerResponse> getAllCustomer();

    public List<CustomerResponse> getAllAndStatusFalse();

    public List<CustomerResponse> getAllAndStatusTrue();

    public CustomerResponse updateCustomer(CustomerDTO customerDTO) throws Exception;

    public void deleteCustomer(String email) throws Exception;

    public void recoverCustomer(String email) throws Exception;

    public void changePassword(ChangePasswordDTO changePasswordDTO) throws Exception;
}

package app.service;

import app.dto.login.LoginDTO;
import app.dto.login.RegisterCustomerDTO;
import app.model.Customer;
import app.response.CustomerResponse;
import app.response.LoginResponse;

public interface CustomerService {

    public LoginResponse loginCustomer(LoginDTO customer) throws Exception;

    public CustomerResponse registerCustomer(RegisterCustomerDTO customerDTO) throws Exception;

    public Customer getAuth();
}

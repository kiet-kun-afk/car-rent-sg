package app.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.dto.login.LoginDTO;
import app.dto.login.RegisterCustomerDTO;
import app.exception.InvalidParamException;
import app.jwt.JwtTokenProvider;
import app.model.Customer;
import app.repository.CustomerRepository;
import app.response.CustomerResponse;
import app.response.LoginResponse;
import app.service.CustomerService;
import lombok.RequiredArgsConstructor;

/**
 * CustomerServiceImpl
 * Version: 1.0
 * Date: 5/25/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/25/2024 kiet-kun-afk Create
 */
@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomerRepository customerRepository;

    @Override
    public LoginResponse loginCustomer(LoginDTO customer) throws Exception {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(customer.getEmailOrPhoneNumber(), customer.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return new LoginResponse("Login successfully", jwtTokenProvider.generateToken(authentication));
    }

    @Override
    public CustomerResponse registerCustomer(RegisterCustomerDTO customerDTP) throws Exception {
        if (customerRepository.existsByEmail(customerDTP.getEmail())) {
            throw new InvalidParamException("Email is already registered");
        }

        if (customerRepository.existsByPhoneNumber(customerDTP.getPhoneNumber())) {
            throw new InvalidParamException("Phone number is already registered");
        }

        if (!customerDTP.getPassword().equals(customerDTP.getRePassword())) {
            throw new InvalidParamException("Password is not match");
        }

        Customer customer = new Customer();
        customer.setEmail(customerDTP.getEmail());
        customer.setPhoneNumber(customerDTP.getPhoneNumber());
        customer.setPassword(passwordEncoder.encode(customerDTP.getPassword()));

        customerRepository.save(customer);
        return CustomerResponse.registerCustomer(customer);
    }

}

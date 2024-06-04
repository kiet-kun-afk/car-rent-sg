package app.service.impl;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.dto.CustomerDTO;
import app.dto.login.ChangePasswordDTO;
import app.dto.login.LoginDTO;
import app.dto.login.RegisterCustomerDTO;
import app.exception.DataNotFoundException;
import app.exception.InvalidParamException;
import app.jwt.JwtTokenProvider;
import app.model.Customer;
import app.repository.CustomerRepository;
import app.response.CustomerResponse;
import app.response.LoginResponse;
import app.service.CustomerService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomerRepository customerRepository;
    private final ValidService validService;
    private final FormatterService formatterService;
    private final FileService fileService;

    @Override
    public LoginResponse loginCustomer(LoginDTO customer) throws Exception {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(customer.getEmailOrPhoneNumber(), customer.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return new LoginResponse("Login successfully", jwtTokenProvider.generateToken(authentication));
    }

    @Override
    public CustomerResponse registerCustomer(RegisterCustomerDTO customerDTO) throws Exception {
        if (customerRepository.existsByEmail(customerDTO.getEmail())) {
            throw new InvalidParamException("Email is already registered");
        }

        if (customerRepository.existsByPhoneNumber(customerDTO.getPhoneNumber())) {
            throw new InvalidParamException("Phone number is already registered");
        }

        if (!validService.validatePassword(customerDTO.getPassword())) {
            throw new InvalidParamException("Password is invalid");
        }

        if (!customerDTO.getPassword().equals(customerDTO.getRePassword())) {
            throw new InvalidParamException("Password is not match");
        }

        Customer customer = new Customer();
        customer.setEmail(customerDTO.getEmail());
        customer.setPhoneNumber(customerDTO.getPhoneNumber());
        customer.setPassword(passwordEncoder.encode(customerDTO.getPassword()));
        customer.setStatus(true);

        customerRepository.save(customer);
        return CustomerResponse.registerCustomer(customer);
    }

    @Override
    public Customer getAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return customerRepository.findByEmailOrPhoneNumberAndStatusTrue(username, username).get();
    }

    @Override
    public List<CustomerResponse> getAllCustomer() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream().map(CustomerResponse::fromCustomer).toList();
    }

    @Override
    public List<CustomerResponse> getAllAndStatusFalse() {
        List<Customer> customers = customerRepository.findByStatusFalse();
        return customers.stream().map(CustomerResponse::fromCustomer).toList();
    }

    @Override
    public List<CustomerResponse> getAllAndStatusTrue() {
        List<Customer> customers = customerRepository.findByStatusTrue();
        return customers.stream().map(CustomerResponse::fromCustomer).toList();
    }

    @Override
    public CustomerResponse updateCustomer(CustomerDTO customerDTO) throws Exception {
        Customer customer = getAuth();
        String phoneNumber = customerDTO.getPhoneNumber();
        if (!validService.validatePhoneNumber(phoneNumber)) {
            throw new InvalidParamException("Phone number is invalid");
        }
        if (customerRepository.existsByPhoneNumberAndCustomerIdNot(phoneNumber,
                customer.getCustomerId())) {
            throw new InvalidParamException("Phone number is already in use");
        }
        String email = customerDTO.getEmail();
        if (customerRepository.existsByEmailAndCustomerIdNot(email, customer.getCustomerId())) {
            throw new InvalidParamException("Email is already in use");
        }
        customer.setEmail(email == null ? customer.getEmail()
                : email);
        customer.setPhoneNumber(phoneNumber == null ? customer.getPhoneNumber()
                : phoneNumber);
        // customer.setFirstName(customerDTO.getFirstName() == null ?
        // customer.getFirstName() : customerDTO.getFirstName());
        // customer.setLastName(customerDTO.getLastName() == null ?
        // customer.getLastName() : customerDTO.getLastName());
        customer.setFullName(customerDTO.getFullName() == null ? customer.getFullName()
                : customerDTO.getFullName());
        customer.setGender(customerDTO.getGender() == null ? customer.getGender()
                : customerDTO.getGender());
        customer.setBirthDate(customerDTO.getBirthDateStr() == null ? customer.getBirthDate()
                : formatterService.stringToDate(customerDTO.getBirthDateStr()));
        customer.setStatus(customerDTO.getStatus() == null ? customer.getStatus()
                : customerDTO.getStatus());
        customer.setAvatarImage(customerDTO.getAvatarImageFile() == null ? customer.getAvatarImage()
                : fileService.saveImage(customerDTO.getAvatarImageFile()));
        return CustomerResponse.fromCustomer(customerRepository.save(customer));
    }

    @Override
    public void deleteCustomer(String email) throws Exception {
        Customer customer = customerRepository.findByEmail(email);
        if (customer == null) {
            throw new DataNotFoundException("Not found customer with email " + email);
        }
        customer.setStatus(false);
        customerRepository.save(customer);
    }

    @Override
    public void recoverCustomer(String email) throws Exception {
        Customer customer = customerRepository.findByEmail(email);
        if (customer == null) {
            throw new DataNotFoundException("Not found customer with email " + email);
        }
        customer.setStatus(true);
        customerRepository.save(customer);
    }

    @Override
    public void changePassword(ChangePasswordDTO changePasswordDTO) throws Exception {
        Customer customer = getAuth();
        String oldPass = changePasswordDTO.getOldPassword();
        if (!passwordEncoder.matches(oldPass, customer.getPassword())) {
            throw new InvalidParamException("Old password is not match");
        }
        String newPass = changePasswordDTO.getNewPassword();
        if (!validService.validatePassword(newPass)) {
            throw new InvalidParamException("Invalid password");
        }
        String confirmPass = changePasswordDTO.getConfirmNewPassword();
        if (!newPass.equals(confirmPass)) {
            throw new InvalidParamException("Re-enter the password does not match");
        }
        customer.setPassword(passwordEncoder.encode(newPass));
        customerRepository.save(customer);
    }

}

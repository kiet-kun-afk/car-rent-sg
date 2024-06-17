package app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import app.dto.CustomerDTO;
import app.dto.login.ChangePasswordDTO;
import app.response.CustomerResponse;
import app.response.ResponseObject;
import app.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}/customers")
@RequiredArgsConstructor
@CrossOrigin
public class CustomerController {

    private final CustomerService customerService;

    // @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @GetMapping("/all")
    public ResponseEntity<ResponseObject> getAll() {
        try {
            List<CustomerResponse> customerResponse = customerService.getAllCustomer();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all customer successfully")
                    .data(customerResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    // @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @GetMapping("/status-false")
    public ResponseEntity<ResponseObject> getAllStatusFalse() {
        try {
            List<CustomerResponse> customerResponse = customerService.getAllAndStatusFalse();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all customer successfully")
                    .data(customerResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    // @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @GetMapping("/status-true")
    public ResponseEntity<ResponseObject> getAllStatusTrue() {
        try {
            List<CustomerResponse> customerResponse = customerService.getAllAndStatusTrue();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get all customer successfully")
                    .data(customerResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    // @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @DeleteMapping("/delete/{phoneNumber}")
    public ResponseEntity<ResponseObject> deleteCustomer(@PathVariable("phoneNumber") String phoneNumber) {
        try {
            customerService.deleteCustomer(phoneNumber);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Delete customer successfully")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    // @PreAuthorize("hasAnyAuthority('ADMIN_ROLE', 'STAFF_ROLE')")
    @PutMapping("/recover/{phoneNumber}")
    public ResponseEntity<ResponseObject> recoverCustomer(@PathVariable("phoneNumber") String phoneNumber) {
        try {
            customerService.recoverCustomer(phoneNumber);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Recover customer successfully")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/change-password")
    public ResponseEntity<ResponseObject> changePassword(
            @Valid @ModelAttribute ChangePasswordDTO changePasswordDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Change password failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            customerService.changePassword(changePasswordDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Change password successfully")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/update")
    public ResponseEntity<ResponseObject> updateCustomer(
            @Valid @ModelAttribute CustomerDTO customerDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Update customer failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            CustomerResponse customerResponse = customerService.updateCustomer(customerDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Update customer successfully")
                    .data(customerResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    // @PreAuthorize("isAuthenticated()")
    @GetMapping("/{phoneNumber}")
    public ResponseEntity<ResponseObject> getCustomerByPhoneNumber(@PathVariable("phoneNumber") String phoneNumber) {
        try {
            CustomerResponse customerResponse = customerService.getOneByPhoneNumber(phoneNumber);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get customer successfully")
                    .data(customerResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/current-customer")
    public ResponseEntity<ResponseObject> getCurrentCustomer() {
        try {
            CustomerResponse customerResponse = customerService.getCurrentCustomer();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Get current customer successfully")
                    .data(customerResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Get current customer failed")
                    .data(e.getMessage())
                    .build());
        }
    }
}

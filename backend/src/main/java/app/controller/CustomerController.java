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
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("")
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

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<ResponseObject> deleteCustomer(@PathVariable("email") String email) {
        try {
            customerService.deleteCustomer(email);
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

    @PutMapping("/recover/{email}")
    public ResponseEntity<ResponseObject> recoverCustomer(@PathVariable("email") String email) {
        try {
            customerService.recoverCustomer(email);
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
}

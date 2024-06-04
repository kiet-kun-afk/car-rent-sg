package app.controller.login;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import org.springframework.web.bind.annotation.*;

import app.dto.login.LoginDTO;
import app.dto.login.RegisterCustomerDTO;
import app.jwt.JWTAuthResponse;
import app.response.CustomerResponse;
import app.response.LoginResponse;
import app.response.ResponseObject;
import app.service.CustomerService;

import app.service.impl.PasswordResetService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * CustomerLoginController
 * Version: 1.0
 * Date: 5/25/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/25/2024 kiet-kun-afk Create
 */
@RestController
@RequestMapping("${api.prefix}/customer")
@RequiredArgsConstructor
public class CustomerLoginController {

    private final CustomerService customerService;

    @PostMapping(value = { "/login", "/signin" })
    public ResponseEntity<ResponseObject> login(@Valid @ModelAttribute LoginDTO customerDTO, BindingResult result) {

        try {
            if (result.hasErrors()) {
                List<String> errors = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
                return ResponseEntity.badRequest().body(ResponseObject.builder()
                        .status(400)
                        .message("Login failed, validation")
                        .data(errors)
                        .build());
            }
            LoginResponse loginResponse = customerService.loginCustomer(customerDTO);
            JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
            jwtAuthResponse.setAccessToken(loginResponse.getToken());
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Login success")
                    .data(loginResponse)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Login failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    @PostMapping(value = { "/register", "/signup" })
    public ResponseEntity<ResponseObject> register(@Valid @ModelAttribute RegisterCustomerDTO customerDTO,
            BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Register failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            CustomerResponse customer = customerService.registerCustomer(customerDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Register success")
                    .data(customer)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Register failed")
                    .data(e.getMessage())
                    .build());
        }
    }

    private final PasswordResetService passwordResetService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        try {
            passwordResetService.createPasswordResetToken(email, "customer", "nothing");
            return ResponseEntity.ok("Password reset link has been sent to your email");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        try {
            passwordResetService.resetPassword(token, newPassword, "customer");
            return ResponseEntity.ok("Password has been reset successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

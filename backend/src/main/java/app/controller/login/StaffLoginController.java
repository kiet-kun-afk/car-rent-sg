package app.controller.login;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import org.springframework.web.bind.annotation.*;

import app.dto.login.LoginDTO;
import app.dto.login.RegisterStaffDTO;
import app.jwt.JWTAuthResponse;
import app.response.LoginResponse;
import app.response.ResponseObject;
import app.response.StaffResponse;
import app.service.StaffService;
import app.service.impl.PasswordResetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * StaffLoginController
 * Version: 1.0
 * Date: 5/25/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/25/2024 kiet-kun-afk Create
 */
@RestController
@RequestMapping("${api.prefix}/staff")
@RequiredArgsConstructor
public class StaffLoginController {

    private final StaffService staffService;

    @PostMapping(value = { "/login", "/signin" })
    public ResponseEntity<ResponseObject> login(@Valid @ModelAttribute LoginDTO staffDTO, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(ResponseObject.builder()
                    .status(400)
                    .message("Login failed, validation")
                    .data(errors)
                    .build());
        }
        try {
            LoginResponse loginResponse = staffService.loginStaff(staffDTO);
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
    public ResponseEntity<ResponseObject> register(@Valid @ModelAttribute RegisterStaffDTO staffDTO,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errors = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
                return ResponseEntity.badRequest().body(ResponseObject.builder()
                        .status(400)
                        .message("Register failed, validation")
                        .data(errors)
                        .build());
            }
            StaffResponse staff = staffService.registerStaff(staffDTO);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(200)
                    .message("Register success")
                    .data(staff)
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
            passwordResetService.createPasswordResetToken(email, "staff", "nothing");
            return ResponseEntity.ok("Password reset link has been sent to your email");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        try {
            passwordResetService.resetPassword(token, newPassword, "staff");
            return ResponseEntity.ok("Password has been reset successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

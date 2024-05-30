package app.controller.login;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import app.service.impl.PasswordResetService;
import lombok.RequiredArgsConstructor;

/**
 * PasswordResetController
 * Version: 1.0
 * Date: 5/25/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/29/2024 kiet-kun-afk Copy from chatGPT
 */
@RestController
@RequestMapping("${api.prefix}")
@RequiredArgsConstructor
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        try {
            passwordResetService.createPasswordResetToken(email);
            return ResponseEntity.ok("Password reset link has been sent to your email");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        try {
            passwordResetService.resetPassword(token, newPassword);
            return ResponseEntity.ok("Password has been reset successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

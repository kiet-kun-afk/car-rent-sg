package app.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.model.Customer;
import app.model.PasswordResetToken;
import app.repository.CustomerRepository;
import app.repository.PasswordResetTokenRepository;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * PasswordResetService
 * Version: 1.0
 * Date: 5/25/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/29/2024 kiet-kun-afk Copy from chatGPT
 */
@Service
@RequiredArgsConstructor
public class PasswordResetService {

    @Value("${reset.token.expiry.minutes}")
    private int expiryMinutes;

    private final CustomerRepository customerRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void createPasswordResetToken(String email) throws Exception {
        Customer customer = customerRepository.findByEmail(email);
        if (customer == null) {
            throw new Exception("Customer not found");
        }

        PasswordResetToken token = new PasswordResetToken();
        token.setCustomer(customer);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(LocalDateTime.now().plusMinutes(expiryMinutes));

        tokenRepository.save(token);

        String resetUrl = "http://localhost:8080/api/reset-password?token=" + token.getToken();
        emailService.sendMail(customer.getEmail(), "Reset Password",
                "<a href=\"" + resetUrl + "\">Click to reset your password</a>");
    }

    @Transactional
    public void resetPassword(String token, String newPassword) throws Exception {
        PasswordResetToken resetToken = tokenRepository.findByToken(token);
        if (resetToken == null || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new Exception("Token is invalid or expired");
        }

        Customer customer = resetToken.getCustomer();
        customer.setPassword(passwordEncoder.encode(newPassword));
        customerRepository.save(customer);

        tokenRepository.delete(resetToken);
    }
}

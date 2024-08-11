package app.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.model.Customer;
import app.model.PasswordResetToken;
import app.model.Staff;
import app.repository.CustomerRepository;
import app.repository.PasswordResetTokenRepository;
import app.repository.StaffRepository;
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
    private final StaffRepository staffRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void createPasswordResetToken(String email, String who, String type) throws Exception {
        if (who.equals("customer")) {

            Customer customer = customerRepository.findByEmailAndStatusTrue(email);

            if (customer == null) {
                throw new Exception("Customer not found");
            }

            PasswordResetToken token = new PasswordResetToken();
            token.setCustomer(customer);
            token.setToken(UUID.randomUUID().toString());
            token.setExpiryDate(LocalDateTime.now().plusMinutes(expiryMinutes));

            tokenRepository.save(token);

            String resetUrl = "http://localhost:3000/reset-password/" + token.getToken();
            emailService.sendMail(customer.getEmail(),
                    "Reset Password", "<a href=\"" + resetUrl + "\">Click to reset your password</a>");

        } else if (who.equals("staff")) {

            Staff staff = staffRepository.findByEmailAndStatusTrue(email);

            if (staff == null) {
                throw new Exception("Staff not found");
            }

            PasswordResetToken token = new PasswordResetToken();
            token.setStaff(staff);
            token.setToken(UUID.randomUUID().toString());

            if (type.equals("first")) {
                token.setExpiryDate(LocalDateTime.now().plusMinutes(43200));
            } else {
                token.setExpiryDate(LocalDateTime.now().plusMinutes(expiryMinutes));
            }

            tokenRepository.save(token);

            String resetUrl = "http://localhost:3001/reset-password/" + token.getToken();
            emailService.sendMail(staff.getEmail(),
                    "Reset Password", "<a href=\"" + resetUrl + "\">Click to reset your password</a>");

        } else {
            throw new Exception("Can not find anyone to send reset password");
        }
    }

    @Transactional
    public void resetPassword(String token, String newPassword, String who) throws Exception {
        PasswordResetToken resetToken = tokenRepository.findByToken(token);

        if (resetToken == null || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new Exception("Token is invalid or expired");
        }

        if (who.equals("customer")) {

            Customer customer = resetToken.getCustomer();
            customer.setPassword(passwordEncoder.encode(newPassword));
            customerRepository.save(customer);

        } else if (who.equals("staff")) {

            Staff staff = resetToken.getStaff();
            staff.setPassword(passwordEncoder.encode(newPassword));
            staffRepository.save(staff);

        } else {
            throw new Exception("Can not find anyone to reset password");
        }

        tokenRepository.delete(resetToken);
    }
}

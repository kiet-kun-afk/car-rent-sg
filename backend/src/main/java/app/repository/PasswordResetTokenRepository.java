package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
}

package app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * PasswordResetToken
 * Version: 1.0
 * Date: 5/29/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/29/2024 kiet-kun-afk Copy from chatGPT
 */
@Setter
@Getter
@Entity
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne(targetEntity = Customer.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne(targetEntity = Staff.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;
}

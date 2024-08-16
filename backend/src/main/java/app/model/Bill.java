package app.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bills")
public class Bill {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "bill_id")
    private Integer billId;

    @Column(name = "pay_date")
    private LocalDateTime payDate;

    @Column(name = "pay_cost", nullable = false)
    private long payCost;

    @Column(name = "remain_cost", nullable = false)
    private long remainCost;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Column(name = "payment_status", nullable = false)
    private Boolean paymentStatus;

    private String describe;

    private long incurredCost;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "contract_id", nullable = false)
    private Contract contract;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

}

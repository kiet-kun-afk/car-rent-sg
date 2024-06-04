package app.model;

import java.util.Date;

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

    @Temporal(TemporalType.DATE)
    @Column(name = "pay_date", nullable = false)
    private Date payDate;

    @Column(name = "pay_cost", nullable = false)
    private Double payCost;

    @Column(name = "incurred_cost", nullable = false)
    private Double incurredCost;

    private String describe;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contract_id", nullable = false)
    private Contract contract;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;
}

package app.model;

import java.time.LocalDateTime;

import app.model.records.DeliveryRecord;
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
@Table(name = "contracts")
public class Contract {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "contract_id")
    private Integer contractId;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "rent_cost", nullable = false)
    private long rentCost;

    @Column(name = "number_day", nullable = false)
    private long numberDay;

    @Column(name = "total_rent_cost", nullable = false)
    private long totalRentCost;

    @Column(nullable = false)
    private long deposit;

    @Column(name = "remain_cost", nullable = false)
    private long remainCost;

    @Column(name = "status_payment", nullable = false)
    private Boolean statusPayment;

    @Column(name = "way_to_pay", nullable = false)
    private String wayToPay;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    private String attachment;

    @OneToOne(mappedBy = "contract", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private DeliveryRecord deliveryRecord;

    @OneToOne(mappedBy = "contract", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Bill bill;
}

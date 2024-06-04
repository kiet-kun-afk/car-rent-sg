package app.model.records;

import java.time.LocalDateTime;

import app.model.Contract;
import app.model.Staff;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "delivery_records")
public class DeliveryRecord {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "delivery_id")
    private Integer deliveryId;

    @Column(name = "delivery_date", nullable = false)
    private LocalDateTime deliveryDate;

    @Column(name = "kilometer_number", nullable = false)
    private Integer kilometerNumber;

    @Column(name = "fuel_number", nullable = false)
    private Integer fuelNumber;

    @Column(nullable = false)
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "contract_id", nullable = false)
    private Contract contract;
}

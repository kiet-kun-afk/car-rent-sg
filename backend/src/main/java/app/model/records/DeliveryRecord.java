package app.model.records;

import java.util.Date;

import app.model.Contract;
import app.model.Staff;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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

    @Temporal(TemporalType.DATE)
    @Column(name = "delivery_date", nullable = false)
    private Date deliveryDate;

    @Column(name = "kilometer_number", nullable = false)
    private Integer kilometerNumber;

    @Column(name = "fuel_number", nullable = false)
    private Integer fuelNumber;

    @Column(nullable = false)
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;
}

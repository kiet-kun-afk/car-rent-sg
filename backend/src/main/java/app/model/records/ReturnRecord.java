package app.model.records;

import java.time.LocalDateTime;

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
@Table(name = "return_records")
public class ReturnRecord {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "return_id")
    private Integer returnId;

    @Column(name = "return_date", nullable = false)
    private LocalDateTime returnDate;

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
    @JoinColumn(name = "delivery_record_id", nullable = false)
    private DeliveryRecord deliveryRecord;
}

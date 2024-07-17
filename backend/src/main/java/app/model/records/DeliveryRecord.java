package app.model.records;

import app.model.Contract;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "delivery_records")
public class DeliveryRecord extends BaseRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_id")
    private Integer deliveryId;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "contract_id", nullable = false)
    private Contract contract;

    @Column(name = "registration_document")
    private String registrationDocument;

    @Column(name = "insurance_document")
    private String insuranceDocument;

    @Column(name = "certificate_of_registration")
    private String certificateOfRegistration;
}

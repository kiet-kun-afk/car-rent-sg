package app.model.cards;

import java.time.LocalDate;

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
@Table(name = "driver_license")
public class DriverLicense {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "driver_license_id")
    private Integer driverLicenseId;

    @Column(name = "id_card", nullable = false)
    private String idCard;

    @Column(name = "front_image", nullable = false)
    private String frontImage;

    @Column(name = "back_image")
    private String backImage;

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    private String category;
}

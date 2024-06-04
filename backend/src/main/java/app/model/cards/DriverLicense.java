package app.model.cards;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "driver_license", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "id_card" }) })
public class DriverLicense {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "driver_license_id")
    private Integer driverLicenseId;

    @Column(name = "id_card", nullable = false)
    private Integer idCard;

    @Column(name = "front_image", nullable = false)
    private String frontImage;

    @Column(name = "back_image", nullable = false)
    private String backImage;
}

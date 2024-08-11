package app.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

// import app.model.cards.CitizenCard;
import app.model.cards.DriverLicense;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "customers")
public class Customer extends BaseEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "customer_id")
    private Integer customerId;

    @Column(name = "full_name")
    private String fullName;

    private Boolean gender;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    private String username;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private Boolean status;

    @Column(name = "avatar_image")
    private String avatarImage;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;

    // @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    // @JoinColumn(name = "citizen_id")
    // private CitizenCard citizenCard;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "driver_license_id")
    private DriverLicense driverLicense;
}

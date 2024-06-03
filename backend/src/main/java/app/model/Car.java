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
@Table(name = "cars", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "registration_plate" }) })
public class Car {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "car_id")
    private Integer carId;

    @Column(name = "registration_plate", nullable = false)
    private String registrationPlate;

    @Column(name = "car_name", nullable = false)
    private String carName;

    @Column(name = "rent_cost", nullable = false)
    private Double rentCost;

    @Column(name = "number_of_seat", nullable = false)
    private Integer numberOfSeat;

    @Column(nullable = false)
    private String transmission;

    @Column(name = "fuel_type", nullable = false)
    private String fuelType;

    @Column(name = "fuel_consumption")
    private String fuelConsumption;

    private String features;

    @Column(name = "front_image")
    private String frontImage;

    @Column(name = "back_image")
    private String backImage;

    @Column(name = "right_image")
    private String rightImage;

    @Column(name = "left_image")
    private String leftImage;

    private String describe;

    @Temporal(TemporalType.DATE)
    @Column(name = "registration_date", nullable = false)
    private Date registrationDate;

    @Column(nullable = false)
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}

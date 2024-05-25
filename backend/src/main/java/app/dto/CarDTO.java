package app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

/**
 * CarDTO
 * Version: 1.0
 * Date: 5/24/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/24/2024 kiet-kun-afk Create
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CarDTO {

    @JsonProperty("registration_plate")
    private String registrationPlate;

    @JsonProperty("car_name")
    private String carName;

    @NotNull(message = "Rent cost is not null")
    @Positive(message = "Rent cost is positive")
    @JsonProperty("rent_cost")
    private Double rentCost;

    @NotNull(message = "Number of seats is not null")
    @Positive(message = "Number of seats is positive")
    @Size(min = 1, max = 40, message = "Number of seats must be between 2 to 40 characters")
    @JsonProperty("number_of_seat")
    private Integer numberOfSeat;

    private String transmission;

    @JsonProperty("fuel_type")
    private String fuelType;

    @JsonProperty("fuel_consumption")
    private String fuelConsumption;

    private String features;

    @JsonProperty("front_image")
    private String frontImage;

    @JsonProperty("back_image")
    private String backImage;

    @JsonProperty("right_image")
    private String rightImage;

    @JsonProperty("left_image")
    private String leftImage;

    private String describe;

    @Past(message = "Registration is in the past")
    @JsonProperty("registration_date")
    private Date registrationDate;

    private Boolean status;

    @NotNull(message = "Branch id is not null")
    @Positive(message = "Branch id is positive")
    @JsonProperty("branch_id")
    private Integer branchId;

    @NotNull(message = "Brand id is not null")
    @Positive(message = "Brand id is positive")
    @JsonProperty("branch_id")
    private Integer brandId;

    @NotNull(message = "Category id seats is not null")
    @Positive(message = "Category id seats is positive")
    @JsonProperty("category_id")
    private Integer categoryId;
}

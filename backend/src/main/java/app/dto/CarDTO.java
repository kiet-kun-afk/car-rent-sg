package app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Positive;

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

    @NotBlank(message = "Registration plate is required")
    private String registrationPlate;

    private String carName;

    @NotNull(message = "Rent cost is not null")
    @Positive(message = "Rent cost is positive")
    private Double rentCost;

    @NotNull(message = "Number of seats is not null")
    @Positive(message = "Number of seats is positive")
    @Max(value = 16, message = "Number of seats is from 0 to 16")
    private Integer numberOfSeat;

    private String transmission;

    private String fuelType;

    private String fuelConsumption;

    private String features;

    private MultipartFile frontImage;

    private MultipartFile backImage;

    private MultipartFile rightImage;

    private MultipartFile leftImage;

    private String describe;

    @Past(message = "Registration is in the past")
    private LocalDate registrationDate;

    private Boolean status;

    @NotNull(message = "Branch id is not null")
    @Positive(message = "Branch id is positive")
    private Integer branchId;

    @NotNull(message = "Brand id is not null")
    @Positive(message = "Brand id is positive")
    private Integer brandId;

    @NotNull(message = "Category id seats is not null")
    @Positive(message = "Category id seats is positive")
    private Integer categoryId;

    // new
    private Long numContracts;

    public CarDTO(String carName, Long numContracts) {
        this.carName = carName;
        this.numContracts = numContracts;
    }
}

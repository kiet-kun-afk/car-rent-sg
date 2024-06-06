package app.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
// import java.time.LocalDateTime;
// import java.util.Date;

import app.model.Car;
import com.fasterxml.jackson.annotation.JsonProperty;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CarResponse {

    @JsonProperty("car_id")
    private Integer carId;

    @JsonProperty("registration_plate")
    private String registrationPlate;

    @JsonProperty("car_name")
    private String carName;

    @JsonProperty("rent_cost")
    private Double rentCost;

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

    @JsonProperty("registration_date")
    private LocalDate registrationDate;

    private Boolean status;

    @JsonProperty("branch_id")
    private Integer branchId;

    @JsonProperty("brand_id")
    private Integer brandId;

    @JsonProperty("category_id")
    private Integer categoryId;
    private String branchName;
    private String brandName;
    private String categoryName;

    public CarResponse(Car car) {
        this.carId = car.getCarId();
        this.registrationPlate = car.getRegistrationPlate();
        this.carName = car.getCarName();
        this.rentCost = car.getRentCost();
        this.numberOfSeat = car.getNumberOfSeat();
        this.transmission = car.getTransmission();
        this.fuelType = car.getFuelType();
        this.fuelConsumption = car.getFuelConsumption();
        this.features = car.getFeatures();
        this.frontImage = car.getFrontImage();
        this.backImage = car.getBackImage();
        this.rightImage = car.getRightImage();
        this.leftImage = car.getLeftImage();
        this.describe = car.getDescribe();
        this.registrationDate = car.getRegistrationDate();
        this.status = car.getStatus();
        this.branchId = car.getBranch().getBranchId();
        this.branchName = car.getBranch().getBranchName();
        this.brandId = car.getBrand().getBrandId();
        this.brandName = car.getBrand().getBrandName();
        this.categoryId = car.getCategory().getCategoryId();
        this.categoryName = car.getCategory().getCategoryName();
    }

    public static CarResponse fromCarResponse(Car car) {
        return new CarResponse(car);
    }
}
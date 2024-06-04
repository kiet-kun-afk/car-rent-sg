package app.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import app.model.Car;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CarResponse {

    private Integer carId;

    private String registrationPlate;

    private String carName;

    private Double rentCost;

    private Integer numberOfSeat;

    private String transmission;

    private String fuelType;

    private String fuelConsumption;

    private String features;

    private String frontImage;

    private String backImage;

    private String rightImage;

    private String leftImage;

    private String describe;

    private LocalDateTime registrationDate;

    private Boolean status;

    private Integer branchId;

    private Integer brandId;

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
        this.registrationDate = (Date) car.getRegistrationDate();
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
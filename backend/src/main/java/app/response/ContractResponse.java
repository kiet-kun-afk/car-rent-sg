package app.response;

import java.time.LocalDateTime;

import app.model.Contract;
import lombok.*;

@Setter
@Getter
public class ContractResponse {

    private Integer contractId;

    private LocalDateTime createDate;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    // giá thuê
    private Double rentCost;

    private long numberDay;

    // tổng cộng
    private Double totalRentCost;

    // tiến cọc
    private Double deposit = 0.0;

    // giấ tiền còn lại
    private Double amount;

    private Boolean statusPayment;

    private String wayToPay;

    private String customerName;
    private String customerPhone;
    private String customerImage;

    private String carName;
    private String carRegistrationPlate;
    private String imgCar;

    private String carImage;

    private Integer staffId;

    private String attachment;

    public ContractResponse(Contract contract) {
        this.contractId = contract.getContractId();
        this.createDate = contract.getCreateDate();
        this.startDate = contract.getStartDate();
        this.endDate = contract.getEndDate();
        this.rentCost = contract.getRentCost();
        this.numberDay = contract.getNumberDay();
        this.totalRentCost = contract.getTotalRentCost();
        this.deposit = contract.getDeposit();
        this.statusPayment = contract.getStatusPayment();
        this.wayToPay = contract.getWayToPay();

        this.customerName = contract.getCustomer().getFullName();
        this.customerPhone = contract.getCustomer().getPhoneNumber();
        this.customerImage = contract.getCustomer().getAvatarImage();

        this.carName = contract.getCar().getCarName();
        this.carRegistrationPlate = contract.getCar().getRegistrationPlate();

        this.imgCar = contract.getCar().getFrontImage();

        this.carImage = contract.getCar().getFrontImage();

        this.staffId = contract.getStaff() == null ? null : contract.getStaff().getStaffId();
        this.attachment = contract.getAttachment();
        // tiền còn lại
        this.amount = contract.getTotalRentCost() - contract.getDeposit();
    }

    public static ContractResponse fromContract(Contract contract) {
        return new ContractResponse(contract);
    }
}

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
    private long rentCost;

    private long numberDay;

    // tổng cộng
    private long totalRentCost;

    // tiến cọc
    private long deposit = 0;

    // số tiền còn lại
    private long amount;

    private Boolean statusPayment;

    private String wayToPay;

    private String customerName;

    private String customerPhone;

    private AddressResponse addressResponse;

    private String carName;

    private CardResponse driverLicense;

    private String carRegistrationPlate;

    private String carImage;

    private Integer staffId;

    private String staffName;

    private String attachment;

    private boolean canDelivery = false;

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

        this.carName = contract.getCar().getCarName();
        this.carRegistrationPlate = contract.getCar().getRegistrationPlate();
        this.carImage = contract.getCar().getFrontImage();

        this.staffId = contract.getStaff() == null ? null : contract.getStaff().getStaffId();
        this.staffName = contract.getStaff() == null ? "" : contract.getStaff().getFullName();
        this.attachment = contract.getAttachment();
        // tiền còn lại
        this.amount = contract.getTotalRentCost() - contract.getDeposit();
        if (contract.getDeliveryRecord() == null) {
            canDelivery = true;
        }
        if (contract.getCustomer().getDriverLicense() != null) {
            this.driverLicense = CardResponse.fromDriverLicense(contract.getCustomer().getDriverLicense());
        }
        if (contract.getCustomer().getAddress() != null) {
            this.addressResponse = AddressResponse.fromResponse(contract.getCustomer().getAddress());
        }
    }

    public static ContractResponse fromContract(Contract contract) {
        return new ContractResponse(contract);
    }
}

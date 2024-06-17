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

    private Double rentCost;

    private long numberDay;

    private Double totalRentCost;

    private Double deposit = 0.0;

    private Double amount;

    private Boolean statusPayment;

    private String wayToPay;

    private Integer customerId;

    private Integer carId;

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
        this.customerId = contract.getCustomer().getCustomerId();
        this.carId = contract.getCar().getCarId();
        this.staffId = contract.getStaff() == null ? null : contract.getStaff().getStaffId();
        this.attachment = contract.getAttachment();
        this.amount = contract.getTotalRentCost() - contract.getDeposit();
    }

    public static ContractResponse fromContract(Contract contract) {
        return new ContractResponse(contract);
    }
}

package app.response;

import java.time.LocalDateTime;

import app.model.Bill;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BillResponse {
    private Integer billId;

    private LocalDateTime payDate;

    private long payCost;

    private String paymentMethod;

    private String describe;

    private Boolean billStatus;

    private Integer contractId;

    private Integer staffId;

    private String registrationPlate;

    private String carName;

    public BillResponse(Bill bill) {
        this.billId = bill.getBillId();
        this.payCost = bill.getPayCost();
        this.paymentMethod = bill.getPaymentMethod();
        this.describe = bill.getDescribe();
        this.payDate = bill.getPayDate();
        this.contractId = bill.getContract().getContractId();
        this.billStatus = bill.getPaymentStatus();
        this.staffId = bill.getStaff().getStaffId();
        this.registrationPlate = bill.getContract().getCar().getRegistrationPlate();
        this.carName = bill.getContract().getCar().getCarName();
    }

    public static BillResponse fromBill(Bill bill) {
        return new BillResponse(bill);
    }
}

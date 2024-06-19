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

    private Double payCost;

    private String paymentMethod;

    private String describe;

    private Boolean billStatus;

    private Integer contractId;

    private Integer staffId;

    public BillResponse(Bill bill) {
        this.billId = bill.getBillId();
        this.payCost = bill.getPayCost();
        this.paymentMethod = bill.getPaymentMethod();
        this.describe = bill.getDescribe();
        this.payDate = bill.getPayDate();
        this.contractId = bill.getContract().getContractId();
        this.billStatus = bill.getContract().getStatusPayment();
        // this.staffId = bill.getStaff().getStaffId();
    }

    public static BillResponse fromBill(Bill bill) {
        return new BillResponse(bill);
    }
}

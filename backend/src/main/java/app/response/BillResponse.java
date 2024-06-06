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
    private Integer BillId;

    private LocalDateTime payDate;

    private Double payCost;

    private Double incurredCost;

    private String describe;

    private Boolean BillStatus;

    private Integer contractId;

    private Integer StaffId;

    public BillResponse(Bill bill) {
        this.BillId = bill.getBillId();
        this.payCost = bill.getPayCost();
        this.incurredCost = bill.getIncurredCost();
        this.describe = bill.getDescribe();
        this.payDate = bill.getPayDate();
        this.contractId = bill.getContract().getContractId();
        this.BillStatus = bill.getContract().getStatusPayment();
        this.StaffId = bill.getStaff().getStaffId();
    }

    public static BillResponse fromBill(Bill bill) {
        return new BillResponse(bill);
    }
}

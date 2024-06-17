package app.response;

import java.time.LocalDateTime;

import app.model.records.DeliveryRecord;
import app.model.records.ReturnRecord;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RecordResponse {

    private Integer id;

    private LocalDateTime dateTime;

    private Integer kilometerNumber;

    private Integer fuelNumber;

    private Boolean status;

    private Integer staffId;

    private Integer contractId;

    private String notes;

    private Double surcharges;

    public RecordResponse(DeliveryRecord deliveryRecord) {
        this.id = deliveryRecord.getDeliveryId();
        this.dateTime = deliveryRecord.getDate();
        this.kilometerNumber = deliveryRecord.getKilometerNumber();
        this.fuelNumber = deliveryRecord.getFuelNumber();
        this.notes = deliveryRecord.getNotes();
        this.status = deliveryRecord.getStatus();
        this.staffId = deliveryRecord.getStaff().getStaffId();
        this.contractId = deliveryRecord.getContract().getContractId();
    }

    public RecordResponse(ReturnRecord returnRecord) {
        this.id = returnRecord.getReturnId();
        this.dateTime = returnRecord.getDate();
        this.kilometerNumber = returnRecord.getKilometerNumber();
        this.fuelNumber = returnRecord.getFuelNumber();
        this.notes = returnRecord.getNotes();
        this.surcharges = returnRecord.getSurcharges();
        this.status = returnRecord.getStatus();
        this.staffId = returnRecord.getStaff().getStaffId();
        this.contractId = returnRecord.getDeliveryRecord().getContract().getContractId();
    }

    public static RecordResponse fromDeliveryRecord(DeliveryRecord deliveryRecord) {
        return new RecordResponse(deliveryRecord);
    }

    public static RecordResponse fromReturnRecord(ReturnRecord returnRecord) {
        return new RecordResponse(returnRecord);
    }
}

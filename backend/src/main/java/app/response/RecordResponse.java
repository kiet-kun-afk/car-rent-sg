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

    private LocalDateTime createDate;

    private Integer kilometerNumber;

    private Integer fuelNumber;

    private Boolean status;

    private String staffName;

    private Integer contractId;

    private String notes;

    private Double surcharges;

    private Double surcharges2;

    private Double remainingAmount;

    private String address;

    private String interior;

    private String exterior;

    private String registrationDocument;

    private String insuranceDocument;

    private String certificateOfRegistration;

    public RecordResponse(DeliveryRecord deliveryRecord) {
        this.id = deliveryRecord.getDeliveryId();
        this.createDate = deliveryRecord.getDate();
        this.kilometerNumber = deliveryRecord.getKilometerNumber();
        this.fuelNumber = deliveryRecord.getFuelNumber();
        this.notes = deliveryRecord.getNotes();
        this.status = deliveryRecord.getStatus();
        this.staffName = deliveryRecord.getStaff().getFullName();
        this.contractId = deliveryRecord.getContract().getContractId();
        this.address = deliveryRecord.getAddress();
        this.interior = deliveryRecord.getInterior();
        this.exterior = deliveryRecord.getExterior();
        this.registrationDocument = deliveryRecord.getRegistrationDocument();
        this.insuranceDocument = deliveryRecord.getInsuranceDocument();
        this.certificateOfRegistration = deliveryRecord.getCertificateOfRegistration();
    }

    public RecordResponse(ReturnRecord returnRecord) {
        this.id = returnRecord.getReturnId();
        this.createDate = returnRecord.getDate();
        this.kilometerNumber = returnRecord.getKilometerNumber();
        this.fuelNumber = returnRecord.getFuelNumber();
        this.notes = returnRecord.getNotes();
        this.surcharges = returnRecord.getSurcharges();
        this.surcharges2 = returnRecord.getSurcharges2();
        this.remainingAmount = returnRecord.getRemainingAmount();
        this.status = returnRecord.getStatus();
        this.staffName = returnRecord.getStaff().getFullName();
        this.contractId = returnRecord.getDeliveryRecord().getContract().getContractId();
        this.address = returnRecord.getAddress();
        this.interior = returnRecord.getInterior();
        this.exterior = returnRecord.getExterior();
    }

    public static RecordResponse fromDeliveryRecord(DeliveryRecord deliveryRecord) {
        return new RecordResponse(deliveryRecord);
    }

    public static RecordResponse fromReturnRecord(ReturnRecord returnRecord) {
        return new RecordResponse(returnRecord);
    }
}

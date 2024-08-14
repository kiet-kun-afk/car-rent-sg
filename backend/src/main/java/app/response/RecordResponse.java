package app.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import app.model.Address;
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

    private String carName;

    private String registrationPlate;

    private Boolean status;

    private String staffName;

    private String staffPhoneNumber;

    private String customerName;

    private String licenseNumber;

    private LocalDate licenseIssuedDate;

    private LocalDate licenseExpiresDate;

    private String customerPhoneNumber;

    private String customerAddress;

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

    private String vehicleInspectionDocument;

    private ContractResponse contract;

    public RecordResponse(DeliveryRecord deliveryRecord) {
        this.id = deliveryRecord.getDeliveryId();
        this.createDate = deliveryRecord.getDate();
        this.kilometerNumber = deliveryRecord.getKilometerNumber();
        this.fuelNumber = deliveryRecord.getFuelNumber();
        this.carName = deliveryRecord.getContract().getCar().getCarName();
        this.registrationPlate = deliveryRecord.getContract().getCar().getRegistrationPlate();
        this.notes = deliveryRecord.getNotes();
        this.status = deliveryRecord.getStatus();
        this.staffName = deliveryRecord.getStaff().getFullName();
        this.staffPhoneNumber = deliveryRecord.getStaff().getPhoneNumber();
        this.customerName = deliveryRecord.getContract().getCustomer().getFullName();
        this.licenseNumber = deliveryRecord.getContract().getCustomer().getDriverLicense() == null ? ""
                : deliveryRecord.getContract().getCustomer().getDriverLicense().getIdCard();
        this.customerPhoneNumber = deliveryRecord.getContract().getCustomer().getPhoneNumber();
        Address address = deliveryRecord.getContract().getCustomer().getAddress();
        if (address == null) {
            this.customerAddress = "";
        } else {
            this.customerAddress = address.getStreet() + ", " + address.getWard() + ", " + address.getDistrict() + ", "
                    + address.getProvince();
        }
        this.contractId = deliveryRecord.getContract().getContractId();
        this.address = deliveryRecord.getAddress();
        this.interior = deliveryRecord.getInterior();
        this.exterior = deliveryRecord.getExterior();
        this.registrationDocument = deliveryRecord.getRegistrationDocument();
        this.insuranceDocument = deliveryRecord.getInsuranceDocument();
        this.vehicleInspectionDocument = deliveryRecord.getCertificateOfRegistration();
        this.contract = ContractResponse.fromContract(deliveryRecord.getContract());
        this.licenseIssuedDate = deliveryRecord.getContract().getCustomer().getDriverLicense() == null ? null
                : deliveryRecord.getContract().getCustomer().getDriverLicense().getIssueDate();
    }

    public RecordResponse(ReturnRecord returnRecord) {
        this.id = returnRecord.getReturnId();
        this.createDate = returnRecord.getDate();
        this.kilometerNumber = returnRecord.getKilometerNumber();
        this.fuelNumber = returnRecord.getFuelNumber();
        this.carName = returnRecord.getDeliveryRecord().getContract().getCar().getCarName();
        this.registrationPlate = returnRecord.getDeliveryRecord().getContract().getCar().getRegistrationPlate();
        this.notes = returnRecord.getNotes();
        this.surcharges = returnRecord.getSurcharges();
        this.surcharges2 = returnRecord.getSurcharges2();
        this.remainingAmount = returnRecord.getRemainingAmount();
        this.status = returnRecord.getStatus();
        this.staffName = returnRecord.getStaff().getFullName();
        this.staffPhoneNumber = returnRecord.getStaff().getPhoneNumber();
        Address address = returnRecord.getDeliveryRecord().getContract().getCustomer().getAddress();
        if (address == null) {
            this.customerAddress = "";
        } else {
            this.customerAddress = address.getDistrict() + " " + address.getProvince() + " " + address.getWard() + " "
                    + address.getStreet();
        }
        this.customerName = returnRecord.getDeliveryRecord().getContract().getCustomer().getFullName();
        this.licenseNumber = returnRecord.getDeliveryRecord().getContract().getCustomer().getDriverLicense() == null
                ? ""
                : returnRecord.getDeliveryRecord().getContract().getCustomer().getDriverLicense().getIdCard();
        this.customerPhoneNumber = returnRecord.getDeliveryRecord().getContract().getCustomer().getPhoneNumber();
        this.contractId = returnRecord.getDeliveryRecord().getContract().getContractId();
        this.address = returnRecord.getAddress();
        this.interior = returnRecord.getInterior();
        this.exterior = returnRecord.getExterior();
        this.registrationDocument = returnRecord.getDeliveryRecord().getRegistrationDocument();
        this.insuranceDocument = returnRecord.getDeliveryRecord().getInsuranceDocument();
        this.vehicleInspectionDocument = returnRecord.getDeliveryRecord().getCertificateOfRegistration();
    }

    public static RecordResponse fromDeliveryRecord(DeliveryRecord deliveryRecord) {
        return new RecordResponse(deliveryRecord);
    }

    public static RecordResponse fromReturnRecord(ReturnRecord returnRecord) {
        return new RecordResponse(returnRecord);
    }
}

package app.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import app.dto.record.DeliveryDTO;
import app.dto.record.ReturnDTO;
import app.exception.InvalidParamException;
import app.model.Bill;
import app.model.Contract;
import app.model.Staff;
import app.model.records.DeliveryRecord;
import app.model.records.ReturnRecord;
import app.repository.BillRepository;
import app.repository.ContractRepository;
import app.repository.DeliveryRecordRepository;
import app.repository.ReturnRecordRepository;
import app.response.RecordResponse;
import app.service.RecordService;
import app.service.StaffService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

    private final StaffService staffService;
    private final ContractRepository contractRepository;
    private final DeliveryRecordRepository deliveryRepository;
    private final ReturnRecordRepository returnRepository;
    private final FileService fileService;
    private final BillRepository billRepository;

    @Override
    public RecordResponse createDeliveryRecord(Integer contractId, DeliveryDTO recordDTO) throws Exception {
        Contract contract = contractRepository.findByContractIdAndPayComplete(contractId);
        if (contract == null) {
            throw new InvalidParamException(
                    "Không tìm thấy hợp đồng, lý do có thể là chưa xác nhận/chưa thanh toán cọc");
        }
        Staff staff = staffService.getAuth();
        DeliveryRecord deliveryRecord = new DeliveryRecord();
        deliveryRecord.setContract(contract);
        deliveryRecord.setStaff(staff);
        deliveryRecord.setFuelNumber(recordDTO.getFuelNumber());
        deliveryRecord.setKilometerNumber(recordDTO.getKilometerNumber());
        deliveryRecord.setDate(LocalDateTime.now());
        deliveryRecord.setNotes(recordDTO.getNotes());
        deliveryRecord.setStatus(true);
        deliveryRecord.setRegistrationDocument(fileService
                .upload(recordDTO.getRegistrationDocument()));
        deliveryRecord.setInsuranceDocument(fileService
                .upload(recordDTO.getInsuranceDocument()));
        deliveryRecord.setCertificateOfRegistration(fileService
                .upload(recordDTO.getCertificateOfRegistration()));
        deliveryRecord.setAddress(recordDTO.getAddress());
        deliveryRecord.setInterior(recordDTO.getInterior());
        deliveryRecord.setExterior(recordDTO.getExterior());
        deliveryRepository.save(deliveryRecord);
        return RecordResponse.fromDeliveryRecord(deliveryRecord);
    }

    @Override
    public RecordResponse createReturnRecord(Integer deliveryRecordId, ReturnDTO recordDTO) throws Exception {
        DeliveryRecord deliveryRecord = deliveryRepository.findByDeliveryIdAndStatusTrue(deliveryRecordId);
        if (deliveryRecord == null) {
            throw new InvalidParamException("Delivery record not found");
        }
        if (recordDTO.getKilometerNumber() < deliveryRecord.getKilometerNumber()) {
            throw new InvalidParamException("Kilometer number must be greater than delivery record kilometer number");
        }
        Contract contract = deliveryRecord.getContract();
        contract.setStatusPayment(recordDTO.getPaymentStatus() == null ? false : recordDTO.getPaymentStatus());
        deliveryRecord.setStatus(false);
        Staff staff = staffService.getAuth();
        ReturnRecord returnRecord = new ReturnRecord();
        returnRecord.setDeliveryRecord(deliveryRecord);
        returnRecord.setStaff(staff);
        returnRecord.setFuelNumber(recordDTO.getFuelNumber());
        returnRecord.setKilometerNumber(recordDTO.getKilometerNumber());
        returnRecord.setDate(LocalDateTime.now());
        returnRecord.setNotes(recordDTO.getNotes());
        Double surcharges = recordDTO.getSurcharges();
        Double surcharges2 = recordDTO.getSurcharges2();
        Double deposit = Double.valueOf(contract.getDeposit());
        Double total = Double.valueOf(contract.getTotalRentCost());
        // contract.setRemainCost(getRemainAmount(surcharges, surcharges2, deposit,
        // total).longValue());
        returnRecord.setSurcharges(recordDTO.getSurcharges() == null ? 0 : recordDTO.getSurcharges());
        returnRecord.setSurcharges2(recordDTO.getSurcharges2() == null ? 0 : recordDTO.getSurcharges2());
        returnRecord.setRemainingAmount(getRemainAmount(surcharges, surcharges2, deposit, total));
        returnRecord.setStatus(true);
        returnRecord.setAddress(recordDTO.getAddress());
        returnRecord.setInterior(recordDTO.getInterior());
        returnRecord.setExterior(recordDTO.getExterior());
        // returnRepository.save(returnRecord);
        saveReturn(returnRepository.save(returnRecord).getReturnId(), returnRecord.getRemainingAmount());
        deliveryRepository.save(deliveryRecord);
        contractRepository.save(contract);
        return RecordResponse.fromReturnRecord(returnRecord);
    }

    private Double getRemainAmount(Double surcharges, Double surcharges2, Double deposit, Double total) {
        if (surcharges == null) {
            surcharges = 0.0;
        }
        if (surcharges2 == null) {
            surcharges2 = 0.0;
        }
        return total + surcharges + surcharges2 - deposit;
    }

    @Override
    public List<RecordResponse> getListDeliveryNotReturnYet() {
        List<DeliveryRecord> records = deliveryRepository.findDeliveryRecordsWithoutReturnRecords();
        return records.stream().map(RecordResponse::fromDeliveryRecord).toList();
    }

    @Override
    public List<RecordResponse> getListReturnRecord() {
        List<ReturnRecord> records = returnRepository.findByStatusTrue();
        return records.stream().map(RecordResponse::fromReturnRecord).toList();
    }

    @Override
    public RecordResponse getDeliveryRecordById(Integer id) throws Exception {
        DeliveryRecord deliveryRecord = deliveryRepository.findById(id).orElseThrow(() -> new Exception("Not found"));
        return RecordResponse.fromDeliveryRecord(deliveryRecord);
    }

    @Override
    public RecordResponse getReturnRecordById(Integer id) throws Exception {
        ReturnRecord returnRecord = returnRepository.findById(id).orElseThrow(() -> new Exception("Not found"));
        return RecordResponse.fromReturnRecord(returnRecord);
    }

    @Override
    public void saveReturn(Integer returnId, Double remainCost) throws Exception {
        Contract contract = contractRepository.findContractByReturnId(returnId);
        contract.setRemainCost(remainCost.longValue());
        Bill bill = billRepository.findBillByReturnId(returnId);
        bill.setRemainCost(remainCost.longValue());
        try {
            billRepository.save(bill);
            contractRepository.save(contract);
        } catch (Exception e) {
            throw new Exception("Lưu thất bại");
        }
    }
}

package app.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import app.dto.RecordDTO;
import app.exception.InvalidParamException;
import app.model.Contract;
import app.model.Staff;
import app.model.records.DeliveryRecord;
import app.model.records.ReturnRecord;
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
    private final DeliveryRecordRepository deliveryRecordRepository;
    private final ReturnRecordRepository recordRepository;

    @Override
    public RecordResponse createDeliveryRecord(Integer contractId, RecordDTO recordDTO) throws Exception {
        Contract contract = contractRepository.findByContractIdAndPayComplete(contractId);
        if (contract == null) {
            throw new InvalidParamException("Maybe contract is not found or is not confirmed");
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
        deliveryRecordRepository.save(deliveryRecord);
        return RecordResponse.fromDeliveryRecord(deliveryRecord);
    }

    @Override
    public RecordResponse createReturnRecord(Integer deliveryRecordId, RecordDTO recordDTO) throws Exception {
        DeliveryRecord deliveryRecord = deliveryRecordRepository.findByDeliveryIdAndStatusTrue(deliveryRecordId);
        if (deliveryRecord == null) {
            throw new InvalidParamException("Delivery record not found");
        }
        if (recordDTO.getKilometerNumber() < deliveryRecord.getKilometerNumber()) {
            throw new InvalidParamException("Kilometer number must be greater than delivery record kilometer number");
        }
        deliveryRecord.setStatus(false);
        Staff staff = staffService.getAuth();
        ReturnRecord returnRecord = new ReturnRecord();
        returnRecord.setDeliveryRecord(deliveryRecord);
        returnRecord.setStaff(staff);
        returnRecord.setFuelNumber(recordDTO.getFuelNumber());
        returnRecord.setKilometerNumber(recordDTO.getKilometerNumber());
        returnRecord.setDate(LocalDateTime.now());
        returnRecord.setNotes(recordDTO.getNotes());
        returnRecord.setSurcharges(recordDTO.getSurcharges() == null ? 0 : recordDTO.getSurcharges());
        returnRecord.setStatus(true);
        recordRepository.save(returnRecord);
        deliveryRecordRepository.save(deliveryRecord);
        return RecordResponse.fromReturnRecord(returnRecord);
    }

    @Override
    public List<RecordResponse> getListDeliveryNotReturnYet() {
        List<DeliveryRecord> records = deliveryRecordRepository.findDeliveryRecordsWithoutReturnRecords();
        return records.stream().map(RecordResponse::fromDeliveryRecord).toList();
    }
}

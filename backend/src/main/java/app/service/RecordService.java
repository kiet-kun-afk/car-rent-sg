package app.service;

import java.util.List;

import app.dto.RecordDTO;
import app.response.RecordResponse;

public interface RecordService {

    public RecordResponse createDeliveryRecord(Integer contractId, RecordDTO recordDTO) throws Exception;

    public RecordResponse createReturnRecord(Integer deliveryRecordId, RecordDTO recordDTO) throws Exception;

    public List<RecordResponse> getListDeliveryNotReturnYet();
}

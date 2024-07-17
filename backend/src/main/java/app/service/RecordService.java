package app.service;

import java.util.List;

import app.dto.record.DeliveryDTO;
import app.dto.record.ReturnDTO;
import app.response.RecordResponse;

public interface RecordService {

    public RecordResponse createDeliveryRecord(Integer contractId, DeliveryDTO recordDTO) throws Exception;

    public RecordResponse createReturnRecord(Integer deliveryRecordId, ReturnDTO recordDTO) throws Exception;

    public List<RecordResponse> getListDeliveryNotReturnYet();

    public List<RecordResponse> getListReturnRecord();
}

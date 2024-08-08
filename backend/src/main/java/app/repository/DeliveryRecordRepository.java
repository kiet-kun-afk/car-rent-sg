package app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.model.records.DeliveryRecord;

public interface DeliveryRecordRepository extends JpaRepository<DeliveryRecord, Integer> {

    List<DeliveryRecord> findAllByStatusTrue();

    @Query("""
            SELECT dr
            FROM DeliveryRecord dr
            WHERE dr.deliveryId NOT IN (SELECT rr.deliveryRecord.deliveryId FROM ReturnRecord rr) AND dr.status = true
            """)
    List<DeliveryRecord> findDeliveryRecordsWithoutReturnRecords();

    DeliveryRecord findByDeliveryIdAndStatusTrue(Integer id);

}

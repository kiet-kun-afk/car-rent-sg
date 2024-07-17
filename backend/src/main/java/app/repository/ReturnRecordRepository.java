package app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.records.ReturnRecord;

public interface ReturnRecordRepository extends JpaRepository<ReturnRecord, Integer> {

    List<ReturnRecord> findByStatusTrue();
}

package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.records.ReturnRecord;

public interface ReturnRecordRepository extends JpaRepository<ReturnRecord, Integer> {

}

package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.Bill;

public interface BillRepository extends JpaRepository<Bill, Integer> {

    public Bill findByBillIdAndPaymentStatusFalse(Integer billId);
}

package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.model.Bill;

public interface BillRepository extends JpaRepository<Bill, Integer> {

    public Bill findByBillIdAndPaymentStatusFalse(Integer billId);

    @Query("SELECT b FROM Bill b " +
            "JOIN b.contract c " +
            "JOIN c.deliveryRecord dr " +
            "JOIN dr.returnRecord rr " +
            "WHERE rr.returnId = :returnId")
    Bill findBillByReturnId(@Param("returnId") Integer returnId);

}

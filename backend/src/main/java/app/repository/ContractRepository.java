package app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.dto.CarDTO;

import app.model.Contract;

public interface ContractRepository extends JpaRepository<Contract, Integer> {

	@Query("""
			SELECT c FROM Contract c
			JOIN c.customer cc
			WHERE cc.customerId = :customerId AND c.contractId = :contractId
			""")
	Contract findByContractIdAndCustomerId(
			@Param("contractId") Integer contractId,
			@Param("customerId") Integer customerId);

	@Query("""
			SELECT c FROM Contract c
			JOIN c.car cc
			WHERE cc.registrationPlate = :registrationPlate
			""")
	List<Contract> findByRegistrationPlate(@Param("registrationPlate") String registrationPlate);

	@Query("""
			SELECT c FROM Contract c
			JOIN c.car cc
			WHERE cc.registrationPlate = :registrationPlate AND c.contractId != :contractId
			""")
	List<Contract> findByRegistrationPlateExcludingContractId(
			@Param("registrationPlate") String registrationPlate,
			@Param("contractId") Integer contractId);

	@Query("""
			SELECT c FROM Contract c
			WHERE c.contractId = :contractId AND c.staff IS NULL
			""")
	Contract findByContractIdAndNoStaff(@Param("contractId") Integer contractId);

	@Query("""
			SELECT c FROM Contract c
			WHERE c.contractId = :contractId AND c.staff IS NOT NULL
			""")
	Contract findByContractIdAndConfirmed(@Param("contractId") Integer contractId);

	@Query("""
			SELECT c FROM Contract c
			WHERE c.contractId = :contractId
			AND c.staff IS NOT NULL
			AND c.deposit > 0
			""")
	Contract findByContractIdAndPayComplete(@Param("contractId") Integer contractId);

	@Query("""
			SELECT c FROM Contract c
			JOIN c.customer cc
			WHERE cc.phoneNumber = :phoneNumber
			""")
	List<Contract> findByCustomerPhoneNumber(@Param("phoneNumber") String phoneNumber);

	@Query("""
			SELECT c FROM Contract c
			JOIN c.staff s
			WHERE s.email = :email
			""")
	List<Contract> findByStaffEmail(@Param("email") String email);

	@Query("""
			SELECT c FROM Contract c
			WHERE c.id NOT IN (SELECT dr.contract.id FROM DeliveryRecord dr)
			AND c.customer.phoneNumber = :phoneNumber
			AND c.staff IS NOT NULL
			""")
	List<Contract> findContractsWithoutDeliveryRecordsByPhoneNumber(@Param("phoneNumber") String phoneNumber);

	@Query("""
			SELECT c FROM Contract c
			WHERE c.id NOT IN (SELECT dr.contract.id FROM DeliveryRecord dr)
			AND c.staff IS NOT NULL
			""")
	List<Contract> findContractsWithoutDeliveryRecords();

	//
	List<Contract> findAllByStatusPaymentTrue();

	// đếm số lượng contract status true
	@Query("SELECT COUNT(c) FROM Contract c WHERE c.statusPayment = true")
	long countContractsByStatusPaymentTrue();

	// api xe được thuê nhiều nhất
	@Query("SELECT NEW app.dto.CarDTO(c.car.carName, COUNT(c.contractId)) " +
			"FROM Contract c " +
			"WHERE c.statusPayment = true " + // Điều kiện lấy các hợp đồng có statusPayment là true
			"GROUP BY c.car.carName " +
			"ORDER BY COUNT(c.contractId) DESC")
	List<CarDTO> findMostRentedCars();

	// new 22/6
	Contract findByContractIdAndStatusPaymentFalse(Integer contractId);

}

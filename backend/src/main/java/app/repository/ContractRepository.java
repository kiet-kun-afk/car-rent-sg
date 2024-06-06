package app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
}

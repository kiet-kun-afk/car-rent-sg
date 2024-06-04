package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.model.cards.DriverLicense;

public interface DriverLicenseRepository extends JpaRepository<DriverLicense, Integer> {

	boolean existsByIdCard(Integer idCard);

	DriverLicense findByIdCard(Integer idCard);

	@Query("""
			SELECT d FROM DriverLicense d
			JOIN Customer cu
			ON d.driverLicenseId = cu.driverLicense.driverLicenseId
			WHERE cu.customerId = :customerId
				""")
	DriverLicense findByCustomerId(@Param("customerId") Integer customerId);
}

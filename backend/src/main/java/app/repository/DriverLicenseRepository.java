package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.model.cards.DriverLicense;

public interface DriverLicenseRepository extends JpaRepository<DriverLicense, Integer> {

	boolean existsByIdCard(String idCard);

	DriverLicense findByIdCard(String idCard);

	@Query("""
			SELECT d FROM DriverLicense d
			JOIN Customer cu
			ON d.driverLicenseId = cu.driverLicense.driverLicenseId
			WHERE cu.phoneNumber = :phoneNumber
				""")
	DriverLicense findByCustomer(@Param("phoneNumber") String phoneNumber);
}

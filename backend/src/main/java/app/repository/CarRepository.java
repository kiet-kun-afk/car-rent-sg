package app.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import app.model.Car;

public interface CarRepository extends JpaRepository<Car, Integer>, JpaSpecificationExecutor<Car> {

    Car findByRegistrationPlateAndStatusTrue(String registrationPlate);

    Car findByRegistrationPlate(String registrationPlate);

    Page<Car> findAll(Specification<Car> spec, Pageable pageable);

    @Query("""
            SELECT c
            FROM Car c
            WHERE NOT EXISTS (
                SELECT 1
                FROM Contract ct
                WHERE ct.car = c
                AND :today BETWEEN ct.startDate AND ct.endDate
            )
            AND c.status = true
            ORDER BY NEWID()
            """)
    Page<Car> findCarsNotInContractToday(LocalDateTime today, Pageable pageable);

    boolean existsByRegistrationPlate(String registrationPlate);

    boolean existsByRegistrationPlateAndCarIdNot(String registrationPlate, Integer carId);

    List<Car> findAllByStatusFalse();

    Car findByRegistrationPlateAndStatusFalse(String registrationPlate);
}

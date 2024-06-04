package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.Car;

public interface CarRepository extends JpaRepository<Car, Integer> {

    Car findByRegistrationPlateAndStatusTrue(String registrationPlate);
}

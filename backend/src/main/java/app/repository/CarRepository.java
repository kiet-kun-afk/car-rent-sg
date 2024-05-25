package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.Car;

/**
 * CarRepository
 * Version: 1.0
 * Date: 5/24/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/24/2024 kiet-kun-afk Create
 */
public interface CarRepository extends JpaRepository<Car, Integer> {

}

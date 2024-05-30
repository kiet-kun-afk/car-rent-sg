package app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.Staff;

/**
 * StaffRepository
 * Version: 1.0
 * Date: 5/25/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/25/2024 kiet-kun-afk Create
 */
public interface StaffRepository extends JpaRepository<Staff, Integer> {

    Staff findByEmail(String email);

    Staff findByPhoneNumber(String phoneNumber);

    Staff findByEmailOrPhoneNumber(String email, String phoneNumber);

    Optional<Staff> findById(Integer id);

    Boolean existsByEmail(String email);

    Boolean existsByPhoneNumber(String phoneNumber);
}

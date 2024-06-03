package app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Customer findByPhoneNumber(String phoneNumber);

    Customer findByEmail(String email);

    Optional<Customer> findByEmailOrPhoneNumberAndStatusTrue(String email, String phoneNumber);

    Boolean existsByEmail(String email);

    Boolean existsByPhoneNumber(String phoneNumber);
}

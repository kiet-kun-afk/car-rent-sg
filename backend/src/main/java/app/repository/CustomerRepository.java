package app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Customer findByPhoneNumberAndStatusTrue(String phoneNumber);

    Customer findByEmailAndStatusTrue(String email);

    Customer findByEmail(String email);

    Optional<Customer> findByEmailOrPhoneNumberAndStatusTrue(String email, String phoneNumber);

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

    boolean existsByPhoneNumberAndCustomerIdNot(String phoneNumber, Integer customerId);

    boolean existsByEmailAndCustomerIdNot(String email, Integer customerId);

    List<Customer> findByStatusTrue();

    List<Customer> findByStatusFalse();

}

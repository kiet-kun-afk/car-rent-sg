package app.service.impl;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import app.model.Customer;
import app.model.Staff;
import app.repository.CustomerRepository;
import app.repository.StaffRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final StaffRepository staffRepository;
    private final CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Staff staff = staffRepository.findByEmailAndStatusTrue(username);
        if (staff == null) {
            Customer customer = customerRepository
                    .findByUsernameOrPhoneNumberOrEmailAndStatusTrue(username, username, username)
                    .orElseThrow(() -> new UsernameNotFoundException("Customer not found"));
            Set<GrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority(customer.getEmail()));

            return new org.springframework.security.core.userdetails.User(username,
                    customer.getPassword(), authorities);
        } else {
            Set<GrantedAuthority> authorities = staff.getRoles().stream()
                    .map(role -> new SimpleGrantedAuthority(role.getName()))
                    .collect(Collectors.toSet());

            return new org.springframework.security.core.userdetails.User(username,
                    staff.getPassword(), authorities);
        }
    }

}

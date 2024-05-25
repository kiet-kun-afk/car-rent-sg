package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.Role;

/**
 * RoleRepository
 * Version: 1.0
 * Date: 5/25/2024
 * Modification Logs
 * DATE AUTHOR DESCRIPTION
 * -------------------------------------
 * 5/25/2024 kiet-kun-afk Create
 */
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);

    Boolean existsByName(String name);
}

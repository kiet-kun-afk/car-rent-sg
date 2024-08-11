package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.Brand;

public interface BrandRepository extends JpaRepository<Brand, Integer> {

}

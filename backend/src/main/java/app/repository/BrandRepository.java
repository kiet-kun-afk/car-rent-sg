package app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.model.Brand;

public interface BrandRepository extends JpaRepository<Brand, Integer> {
    @Query("""
            SELECT b FROM Brand b
            WHERE EXISTS (
                SELECT 1 FROM Car c
                WHERE c.brand = b
                AND c.status = true
            )
            ORDER BY (
                SELECT COUNT(DISTINCT c.carId) FROM Car c WHERE c.brand = b
            ) DESC
            """)
    List<Brand> findOrderBrands();
}

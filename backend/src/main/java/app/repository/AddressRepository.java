package app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.model.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Address a WHERE " +
            "(:province IS NULL OR a.province = :province) AND " +
            "(:district IS NULL OR a.district = :district) AND " +
            "(:ward IS NULL OR a.ward = :ward) AND " +
            "(:street IS NULL OR a.street = :street)")
    boolean existsByProvinceAndDistrictAndWardAndStreet(
            @Param("province") String province,
            @Param("district") String district,
            @Param("ward") String ward,
            @Param("street") String street);

    default boolean existsByAddressAttributes(
            Optional<String> province,
            Optional<String> district,
            Optional<String> ward,
            Optional<String> street) {
        return existsByProvinceAndDistrictAndWardAndStreet(
                province.orElse(null),
                district.orElse(null),
                ward.orElse(null),
                street.orElse(null));
    }
}

package app.repository.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import app.model.Car;

public class CarSpecifications {

    public static Specification<Car> hasBrandName(String brandName) {
        return (root, query, cb) -> {
            if (brandName != null && !brandName.equals("")) {
                return cb.equal(root.get("brand").get("brandName"), brandName);
            }
            return null;
        };
    }

    public static Specification<Car> hasCountry(String countryOrigin) {
        return (root, query, cb) -> {
            if (countryOrigin != null && !countryOrigin.equals("")) {
                return cb.equal(root.get("brand").get("countryOrigin"), countryOrigin);
            }
            return null;
        };
    }

    public static Specification<Car> hasTransmission(String transmission) {
        return (root, query, cb) -> {
            if (transmission != null && !transmission.equals("")) {
                return cb.equal(root.get("transmission"), transmission);
            }
            return null;
        };
    }

    public static Specification<Car> hasFuelType(String fuelType) {
        return (root, query, cb) -> {
            if (fuelType != null && !fuelType.equals("")) {
                return cb.equal(root.get("fuelType"), fuelType);
            }
            return null;
        };
    }

    public static Specification<Car> hasCategory(List<String> categoryNames) {
        return (root, query, cb) -> {
            if (categoryNames != null && categoryNames.isEmpty()) {
                return root.get("category").get("categoryName").in(categoryNames);
            }
            return null;
        };
    }

    public static Specification<Car> hasRentCost(Double minCost, Double maxCost) {
        return (root, query, cb) -> {
            if (minCost != null && maxCost != null) {
                return cb.between(root.get("rentCost"), minCost, maxCost);
            } else if (minCost != null) {
                return cb.greaterThanOrEqualTo(root.get("rentCost"), minCost);
            } else if (maxCost != null) {
                return cb.lessThanOrEqualTo(root.get("rentCost"), maxCost);
            }
            return null;
        };
    }

    public static Specification<Car> hasNumberOfSeat(Integer minSeat, Integer maxSeat) {
        return (root, query, criteriaBuilder) -> {
            if (minSeat != null && maxSeat != null) {
                return criteriaBuilder.between(root.get("numberOfSeat"), minSeat, maxSeat);
            } else if (maxSeat != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("numberOfSeat"), maxSeat);
            } else if (minSeat != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("numberOfSeat"), minSeat);
            }
            return null;
        };
    }

    public static Specification<Car> hasStatus(Boolean status) {
        return (root, query, criteriaBuilder) -> {
            if (status != null) {
                return criteriaBuilder.equal(root.get("status"), status);
            }
            return null;
        };
    }
}

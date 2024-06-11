package app.repository.specification;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import app.model.Car;
import app.model.Contract;
import jakarta.persistence.criteria.*;

public class CarSpecifications {

    public static Specification<Car> notInContractToday(LocalDateTime today) {
        return (root, query, criteriaBuilder) -> {
            Subquery<Integer> subquery = query.subquery(Integer.class);
            Root<Contract> subRoot = subquery.from(Contract.class);
            subquery.select(criteriaBuilder.literal(1));
            subquery.where(
                    criteriaBuilder.equal(subRoot.get("car"), root),
                    criteriaBuilder.between(criteriaBuilder.literal(today), subRoot.get("startDate"),
                            subRoot.get("endDate")));
            return criteriaBuilder.not(criteriaBuilder.exists(subquery));
        };
    }

    public static Specification<Car> hasNumberOfSeat(Integer numberOfSeat) {
        return (root, query, criteriaBuilder) -> {
            if (numberOfSeat != null) {
                return criteriaBuilder.equal(root.get("numberOfSeat"), numberOfSeat);
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

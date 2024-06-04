package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.model.cards.CitizenCard;

public interface CitizenCardRepository extends JpaRepository<CitizenCard, Integer> {

	boolean existsByIdCard(Integer idCard);

	CitizenCard findByIdCard(Integer idCard);

	@Query("""
			SELECT c FROM CitizenCard c
			JOIN Customer cu
			ON c.citizenId = cu.citizenCard.citizenId
			WHERE cu.customerId = :customerId
				""")
	CitizenCard findByCustomerId(@Param("customerId") Integer customerId);

	@Query("""
			SELECT c FROM CitizenCard c
			JOIN Staff s
			ON c.citizenId = s.citizenCard.citizenId
			WHERE s.staffId = :staffId
				""")
	CitizenCard findByStaffId(@Param("staffId") Integer staffId);
}

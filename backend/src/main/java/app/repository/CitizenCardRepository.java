package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.model.cards.CitizenCard;

public interface CitizenCardRepository extends JpaRepository<CitizenCard, Integer> {

}

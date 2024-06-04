package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.cards.CitizenCard;

public interface CitizencardRepository extends JpaRepository<CitizenCard, Integer> {

}

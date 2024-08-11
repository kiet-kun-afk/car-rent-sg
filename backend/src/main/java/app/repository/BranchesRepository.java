package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.Branch;

public interface BranchesRepository extends JpaRepository<Branch , Integer>{};
package com.Elvis.olympics.repository;

import com.Elvis.olympics.model.Disciplines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DisciplineRepository extends JpaRepository<Disciplines, String> {
    @Query("select d.name from Disciplines d")
    List<String> findName();
}

package com.Elvis.olympics.repository;

import com.Elvis.olympics.model.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface AthleteRepository extends JpaRepository<Athlete, UUID> {
    @Query("select a.firstName from Athlete a where a.uuid = ?1")
    String findFirstNameByUuid(UUID uuid);

    @Query("select a.lastName from Athlete a where a.uuid = ?1")
    String findLastNameByUuid(UUID uuid);

    @Query("select a.uuid from Athlete a")
    List<UUID> findUuid();
}

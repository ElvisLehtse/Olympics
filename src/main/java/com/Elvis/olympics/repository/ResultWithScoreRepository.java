package com.Elvis.olympics.repository;

import com.Elvis.olympics.model.Athlete;
import com.Elvis.olympics.model.ResultWithScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface ResultWithScoreRepository extends JpaRepository<ResultWithScore, UUID> {
    @Query("select r from ResultWithScore r where r.athlete.uuid = ?1")
    List<ResultWithScore> findByAthlete_Uuid(UUID uuid);

    @Query("select r.score from ResultWithScore r where r.athlete.uuid = ?1")
    List<Integer> findScoreByAthlete_Uuid(UUID uuid);

    @Query("select r from ResultWithScore r where r.discipline = ?1 order by r.score DESC")
    List<ResultWithScore> findByDisciplineOrderByScoreDesc(String discipline);

    List<ResultWithScore> findByAthlete_UuidAndDiscipline(UUID uuid, String discipline);
    @Transactional
    @Modifying
    @Query("update ResultWithScore r set r.result = ?1, r.score = ?2 where r.athlete = ?3 and r.discipline = ?4")
    void updateResultAndScoreByAthleteAndDiscipline(int result, Integer score, Athlete athlete, String discipline);
}


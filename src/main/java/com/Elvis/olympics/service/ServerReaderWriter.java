package com.Elvis.olympics.service;

import com.Elvis.olympics.model.Athlete;
import com.Elvis.olympics.model.ResultWithScore;
import com.Elvis.olympics.repository.AthleteRepository;
import com.Elvis.olympics.repository.CountryRepository;
import com.Elvis.olympics.repository.DisciplineRepository;
import com.Elvis.olympics.repository.ResultWithScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * This class reads and writes data to PostgreSQL server.
 */

@Service
public class ServerReaderWriter {

    @Autowired
    AthleteRepository athleteRepository;
    @Autowired
    CountryRepository countryRepository;
    @Autowired
    DisciplineRepository disciplineRepository;
    @Autowired
    ResultWithScoreRepository resultWithScoreRepository;

    public List<String> readCountries() {
        return countryRepository.findNameByOrderByNameAsc();
    }

    public List<String> readDisciplines() {
        return disciplineRepository.findName();
    }

    public List<Athlete> readAthletes() {
        return athleteRepository.findAll();
    }

    public List<String> readDisciplinesAndTotalScore() {
        List<String> disciplinesAndTotal = disciplineRepository.findName();
        disciplinesAndTotal.add("Total score");
        return disciplinesAndTotal;
    }

    public void writeAthlete(Athlete athlete) {
        athleteRepository.save(athlete);
    }

    /**
     * If a new athlete result is being entered, the method first checks if a result for the same discipline for that athlete already exists.
     * If it exists, it is updated; if it does not exist, it is inserted.
     */
    public void writeResult(ResultWithScore result) {
        List<ResultWithScore> resultWithScores = resultWithScoreRepository.findByAthlete_UuidAndDiscipline(result.getAthlete().getUuid(), result.getDiscipline());
        if (resultWithScores.isEmpty()) {
            resultWithScoreRepository.save(new ResultWithScore(result.getUuid(), result.getDiscipline(), result.getResult(), result.getScore(), result.getAthlete()));
        } else {
            resultWithScoreRepository.updateResultAndScoreByAthleteAndDiscipline(result.getResult(), result.getScore(), result.getAthlete(), result.getDiscipline());
        }
    }

    public List<ResultWithScore> readResults(UUID athleteUuid) {
        return resultWithScoreRepository.findByAthlete_Uuid(athleteUuid);
    }

    public Integer readScore(UUID athleteUuid) {
        List<Integer> score = resultWithScoreRepository.findScoreByAthlete_Uuid(athleteUuid);
        return score.stream().mapToInt(Integer::intValue).sum();
    }

    /**
     * Sorts the athletes based on their score for a single discipline or for their total score.
     */

    public List<ResultWithScore> readTopAthletes(String discipline, String country) {
        List<ResultWithScore> topAthletes = new ArrayList<>();
        if (!discipline.equals("Total score")) {
            topAthletes = resultWithScoreRepository.findByDisciplineOrderByScoreDesc(discipline);
        } else {
            List<Athlete> listOfAthletes = athleteRepository.findAll();
            for (Athlete athlete : listOfAthletes) {
                List<Integer> score = resultWithScoreRepository.findScoreByAthlete_Uuid(athlete.getUuid());
                topAthletes.add(new ResultWithScore(null, discipline, 0, score.stream().mapToInt(Integer::intValue).sum(), athlete));
            }
            topAthletes = topAthletes.stream().sorted((o1, o2) -> o2.getScore().compareTo(o1.getScore())).collect(Collectors.toList());
        }
        if (!country.equals("NONE")) {
           topAthletes =  topAthletes.stream().filter(c -> c.getAthlete().getCountry().equals(country)).collect(Collectors.toList());
        }
        return topAthletes;
    }
}

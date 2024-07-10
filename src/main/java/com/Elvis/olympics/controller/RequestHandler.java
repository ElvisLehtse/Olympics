package com.Elvis.olympics.controller;

import com.Elvis.olympics.model.*;
import com.Elvis.olympics.repository.AthleteRepository;
import com.Elvis.olympics.service.ScoreCalculator;
import com.Elvis.olympics.service.ServerReaderWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("http://localhost:3000")
public class RequestHandler {

    @Autowired
    ServerReaderWriter serverReaderWriter;
    @Autowired
    ScoreCalculator scoreCalculator;
    @Autowired
    private AthleteRepository athleteRepository;

    @GetMapping("countries")
    public List<String> getCountries() {
        return serverReaderWriter.readCountries();
    }

    @GetMapping("disciplines")
    public List<String> getDisciplines() {
        return serverReaderWriter.readDisciplines();
    }

    @GetMapping("athletes")
    public List<Athlete> getAthletes() {
        return serverReaderWriter.readAthletes();
    }

    @GetMapping("disciplinesAndTotal")
    public List<String> getDisciplinesAndTotal() {
        return serverReaderWriter.readDisciplinesAndTotalScore();
    }

    @GetMapping("countriesFilter")
    public List<String> getCountriesAsFilter() {
        List<String> countries = serverReaderWriter.readCountries();
        countries.addFirst("NONE");
        return countries;
    }

    @PostMapping("registration")
    public String postRegistration(@RequestParam(value = "firstname") String firstName, @RequestParam(value = "lastname") String lastName,
                                         @RequestParam(value = "age") int age, @RequestParam(value = "country") String country) {

        serverReaderWriter.writeAthlete(new Athlete(null, firstName, lastName, age, country));
        return firstName + " " + lastName + " has been registered.";
    }

    @PostMapping("setResults")
    public String postSetResults(@RequestParam(value = "athlete") String athleteUuid,
                                       @RequestParam(value = "discipline") String discipline, @RequestParam(value = "result") int result) {

        Result resultValue = new Result(null, discipline, result, athleteRepository.findById(UUID.fromString(athleteUuid)).orElseThrow());
        scoreCalculator.calculateAthleteScore(resultValue);

        String firstName = athleteRepository.findFirstNameByUuid(UUID.fromString(athleteUuid));
        String lastName = athleteRepository.findLastNameByUuid(UUID.fromString(athleteUuid));
        return "Result " + result + " for " + firstName + " " + lastName + " has been registered.";
    }

    @GetMapping("getResults")
    public List<ResultWithScore> getResults(@RequestParam(value = "athlete") String athleteUuid) {
        return serverReaderWriter.readResults(UUID.fromString(athleteUuid));
    }

    @GetMapping("getScore")
    public Integer getScore(@RequestParam(value = "athlete") String athleteUuid) {
        return serverReaderWriter.readScore(UUID.fromString(athleteUuid));
    }

    @GetMapping("getTopAthletes")
    public List<ResultWithScore> getTopAthletes(@RequestParam(value = "discipline") String discipline, @RequestParam(value = "country") String country) {
        return serverReaderWriter.readTopAthletes(discipline, country);
    }
}

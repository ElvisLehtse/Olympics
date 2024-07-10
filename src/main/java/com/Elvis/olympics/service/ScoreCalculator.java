package com.Elvis.olympics.service;

import com.Elvis.olympics.model.Result;
import com.Elvis.olympics.model.ResultWithScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScoreCalculator {

    @Autowired
    ServerReaderWriter serverReaderWriter;

    public void calculateAthleteScore(Result result) {
        int score = 0;
        switch (result.getDiscipline()) {
            case "100m run" -> score = 100 / result.getResult();
            case "long jump" -> score = 10 * result.getResult();
            case "short put" -> score = 10 * result.getResult();
            case "high jump" -> score = 10 * result.getResult();
            case "400m run" -> score = 400 / result.getResult();
            case "110m hurdles" -> score = 110 / result.getResult();
            case "discus" -> score = 10 * result.getResult();
            case "pole vault" -> score = 10 * result.getResult();
            case "javelin" -> score = 10 * result.getResult();
            case "1500 run" -> score = 2000 / result.getResult();
        }
        serverReaderWriter.writeResult(new ResultWithScore(result.getUuid(), result.getDiscipline(), result.getResult(), score, result.getAthlete()));
    }
}

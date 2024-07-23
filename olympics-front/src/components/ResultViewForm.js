import React from 'react'
import { useState } from 'react';

function ResultViewForm({formData, onInputChange, athletes}) {

  const[athleteResults, setAthleteResults] = useState([]);
  const[responseScore, setResponseScore] = useState("");

  // Fetches the results and scores of an athlete
  function getResults(event) {
    event.preventDefault();
    fetch("http://localhost:8080/getResults?athlete=" + formData.getAthlete)
    .then(res => res.json())
    .then(body => setAthleteResults(body));
    fetch("http://localhost:8080/getScore?athlete=" + formData.getAthlete)
    .then(res => res.json())
    .then(body => setResponseScore(body));
  }

  return (
    <>
      <form onSubmit={getResults}>
        <h5>View athletes results</h5>
        <div className="form-group">
          <div className="col-sm-5">
            <label htmlFor="getAthlete" className="form-label">Select an athlete:</label>
            <select onChange={onInputChange} className="form-select" id="getAthlete">
              {athletes.map(athlete => <option key={athlete.uuid} value={athlete.uuid}>{athlete.firstName + " " + athlete.lastName + " (" + athlete.country + ")"}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
      {athleteResults.length !== 0 &&
      <div>
        <br/><span>List of logged results:</span><br/>
        <span>{athleteResults.map(athleteResult => <div key={athleteResult.uuid}> {"Discipline: " + athleteResult.discipline + " | result: " + athleteResult.result + " | score: " + athleteResult.score}<br/></div>)}</span><br/>
        <span>Total score: {responseScore}</span>
      </div>
      }
    </>
  )
}

export default ResultViewForm
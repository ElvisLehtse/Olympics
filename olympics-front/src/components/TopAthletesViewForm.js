import React from 'react'
import { useState } from 'react';

function TopAthletesViewForm({formData, onInputChange, disciplinesAndTotal, countriesFilter}) {

  const[topAthletes, setTopAthletes] = useState([]);

  // Fetches the sorted list of athletes for the specified discipline
  function getTopAthletes(event) {
    event.preventDefault();
    fetch("http://localhost:8080/getTopAthletes?discipline=" + formData.disciplineForTopAthletes + "&country=" + formData.countryForTopAthletes)
    .then(res => res.json())
    .then(body => setTopAthletes(body));
  }

  return (
    <>
      <form onSubmit={getTopAthletes}>
        <h5>View top Athletes</h5>
        <div className="form-group">
          <div className="col-sm-5">
            <label htmlFor="disciplineForTopAthletes" className="form-label">Sort by:</label>
            <select onChange={onInputChange} className="form-select" id="disciplineForTopAthletes">
              {disciplinesAndTotal.map(total => <option key={total}>{total}</option>)}
            </select>
          </div>
        </div>
        <div className="from-group">
          <div className="col-sm-2">
            <label htmlFor="countryForTopAthletes" className="form-label">Filter by country</label>
            <select onChange={onInputChange} className="form-select" id="countryForTopAthletes">
              {countriesFilter.map(country => <option key={country}>{country}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
      {topAthletes.length !== 0 &&
        <div>
          <br/><span>List of top Athletes for {topAthletes[0].discipline}:</span><br/>
          <span>{topAthletes.map(athletes => <div key={athletes.uuid}> {athletes.athlete.firstName + " " + athletes.athlete.lastName + " (" + athletes.athlete.country + ") | score: " + athletes.score}<br/></div>)}</span><br/>
        </div>
      }
    </>
  )
}

export default TopAthletesViewForm
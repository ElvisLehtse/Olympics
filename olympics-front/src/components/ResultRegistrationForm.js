import React from 'react'
import { useState } from 'react';

function ResultRegistrationForm({onInputChange, athletes, disciplines, formData}) {

  const[responseResult, setResponseResult] = useState("");

  // Sends a new result to back-end
  function setResult(event) {
    event.preventDefault();
    if (!formData.result) {
      setResponseResult("Please insert a result.")
    } else {
      fetch("http://localhost:8080/setResults?athlete=" + formData.athlete + "&discipline=" + 
        formData.discipline + "&result=" + formData.result, {method: "POST"})
      .then(res => res.text())
      .then(body => setResponseResult(body));
    }
  }

  return (
    <form onSubmit={setResult}>
      <h5>Add results to athletes</h5>
      <div className="form-group">
        <div className="col-sm-5">
          <label htmlFor="athlete" className="form-label">Select an athlete:</label>
          <select onChange={onInputChange} className="form-select" id="athlete">
            {athletes.map(athlete => <option key={athlete.uuid} value={athlete.uuid}>{athlete.firstName + " " + athlete.lastName + " (" + athlete.country + ")"}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-5">
          <label htmlFor="discipline" className="form-label">Select a discipline:</label>
          <select onChange={onInputChange} className="form-select" id="discipline">
            {disciplines.map(discipline => <option key={discipline}>{discipline}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="result">Result:</label>
        <div className="col-sm-2">
          <input onChange={onInputChange} type="number" id="result" placeholder="result" className="form-control"></input>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Submit</button>
      <br/><span> {responseResult} </span>
    </form>
  )
}

export default ResultRegistrationForm
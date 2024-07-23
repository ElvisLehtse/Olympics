import React from 'react'

function AthleteRegistraionForm({setAthlete, onInputChange, countries, responseAthlete}) {
  
  return (
    <form onSubmit={setAthlete}>
      <h5>Add a new athlete</h5>
      <div className="form-group">
        <label htmlFor="firstname">First name:</label>
        <div className="col-sm-5">
          <input onChange={onInputChange} type="text" id="firstname" placeholder="first name" className="form-control"></input>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="lastname">Last name:</label>
        <div className="col-sm-5">
          <input onChange={onInputChange} type="text" id="lastname" placeholder="last name" className="form-control"></input>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <div className="col-sm-2">
          <input onChange={onInputChange} type="number" id="age" placeholder="age" className="form-control"></input>
        </div>
      </div>
      <div className="from-group">
        <div className="col-sm-2">
          <label htmlFor="country" className="form-label">Country</label>
          <select onChange={onInputChange} type="text" id="country" className="form-select">
            {countries.map(country => <option key={country}>{country}</option>)}
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Submit</button>
      <br/><span> {responseAthlete} </span>
    </form>
  )
}

export default AthleteRegistraionForm
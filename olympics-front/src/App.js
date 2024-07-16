import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const[responseAthlete, setResponseAthlete] = useState([]);
  const[responseResult, setResponseResult] = useState("");
  const[athleteResults, setAthleteResults] = useState([]);
  const[topAthletes, setTopAthletes] = useState([]);
  const[countries, setCountries] = useState([]);
  const[countriesFilter, setCountriesFilter] = useState([]);
  const[athletes, setAthletes] = useState([]);
  const[disciplines, setDisciplines] = useState([]);
  const[responseScore, setResponseScore] = useState("");
  const[disciplinesAndTotal, setDisciplinesAndTotal] = useState([]);

  const[formData, setFormData] = useState([]);

  // When the browser is first loaded, all necessary data is loaded from the server
  // initial selections of drop-down menus are inserted into formData
  useEffect(() => {
    fetch("http://localhost:8080/countries")
    .then(res => res.json())
    .then(body => {
      setCountries(body)
      setFormData(prev => ({...prev, "country": body[0]}))
    });
    fetch("http://localhost:8080/disciplines")
    .then(res => res.json())
    .then(body => {
      setDisciplines(body)
      setFormData(prev => ({...prev, "discipline": body[0]}))
    });
    fetch("http://localhost:8080/disciplinesAndTotal")
    .then(res => res.json())
    .then(body => {
      setDisciplinesAndTotal(body)
      setFormData(prev => ({...prev, "disciplineForTopAthletes": body[0]}))
    });
    fetch("http://localhost:8080/countriesFilter")
    .then(res => res.json())
    .then(body => {
      setCountriesFilter(body)
      setFormData(prev => ({...prev, "countryForTopAthletes": body[0]}))
    });
    getAthletes();
  }, [])

  // This function stores each change made, character by character, into the formData when a form is being filled
  // When the form is being submitted, the required values can be read by calling the corresponding names
  function onInputChange(e) {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    //console.log(formData) <--- Use for troubleshooting
  }

  // Fetches the latest list of athletes
  function getAthletes() {
    fetch("http://localhost:8080/athletes")
    .then(res => res.json())
    .then(body => {
      setAthletes(body)
      setFormData(prev => ({...prev, "athlete": body[0].uuid}))
      setFormData(prev => ({...prev, "getAthlete": body[0].uuid}))
    });
  }

  // Sends a new athlete to back-end and calls for an update on the list
  function setAthlete(event) {
    event.preventDefault();
    fetch("http://localhost:8080/registration?firstname=" + formData.firstname + "&lastname=" + 
      formData.lastname + "&age=" + formData.age + "&country=" + formData.country, {method: "POST"}) 
    .then(res => res.text())
    .then(body => {
      setResponseAthlete(body)
      getAthletes();
    });
  }

  // Sends a new result to back-end
  function setResult(event) {
    event.preventDefault();
    fetch("http://localhost:8080/setResults?athlete=" + formData.athlete + "&discipline=" + 
      formData.discipline + "&result=" + formData.result, {method: "POST"})
    .then(res => res.text())
    .then(body => setResponseResult(body));
  }

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

  // Fetches the sorted list of athletes for the specified discipline
  function getTopAthletes(event) {
    event.preventDefault();
    fetch("http://localhost:8080/getTopAthletes?discipline=" + formData.disciplineForTopAthletes + "&country=" + formData.countryForTopAthletes)
    .then(res => res.json())
    .then(body => setTopAthletes(body));
  }

  return (
   <div className="App">
    <div className="container mt-3">

        <form onSubmit={setAthlete}>
          <h5>Add a new athlete</h5>
          <div className="form-group">
            <label htmlFor="firstname">First name:</label>
            <div className="col-sm-5">
              <input onChange={onInputChange} type="text" id="firstname" name="firstname" placeholder="first name" className="form-control"></input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last name:</label>
            <div className="col-sm-5">
              <input onChange={onInputChange} type="text" id="lastname" name="lastname" placeholder="last name" className="form-control"></input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <div className="col-sm-2">
              <input onChange={onInputChange} type="number" id="age" name="age" placeholder="age" className="form-control"></input>
            </div>
          </div>
          <div className="from-group">
            <div className="col-sm-2">
              <label htmlFor="country" className="form-label">Country</label>
              <select onChange={onInputChange} type="text" id="country" name="country" className="form-select">
                {countries.map(country => <option key={country}>{country}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
          <br/><span> {responseAthlete} </span>
        </form><br/>

        <form onSubmit={setResult}>
          <h5>Add results to athletes</h5>
          <div className="form-group">
            <div className="col-sm-5">
              <label htmlFor="athlete" className="form-label">Select an athlete:</label>
              <select onChange={onInputChange} className="form-select" name="athlete" id="athlete">
                {athletes.map(athlete => <option key={athlete.uuid} value={athlete.uuid}>{athlete.firstName + " " + athlete.lastName + " (" + athlete.country + ")"}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-5">
              <label htmlFor="discipline" className="form-label">Select a discipline:</label>
              <select onChange={onInputChange} className="form-select" name="discipline" id="discipline">
                {disciplines.map(discipline => <option key={discipline}>{discipline}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="result">Result:</label>
            <div className="col-sm-2">
              <input onChange={onInputChange} type="number" id="result" name="result" placeholder="result" className="form-control"></input>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
          <br/><span> {responseResult} </span>
        </form><br/>

        <form onSubmit={getResults}>
          <h5>View athletes results</h5>
          <div className="form-group">
            <div className="col-sm-5">
              <label htmlFor="athlete" className="form-label">Select an athlete:</label>
              <select onChange={onInputChange} className="form-select" name="getAthlete" id="getAthlete">
                {athletes.map(athlete => <option key={athlete.uuid} value={athlete.uuid}>{athlete.firstName + " " + athlete.lastName + " (" + athlete.country + ")"}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
        {athleteResults.length !== 0 &&
        <div>
          <br/><span>List of logged results:</span><br/>
          <span>{athleteResults.map(athleteResult => <>{"Discipline: " + athleteResult.discipline + " | result: " + athleteResult.result + " | score: " + athleteResult.score}<br/></>)}</span><br/>
          <span>Total score: {responseScore}</span>
        </div>
        }<br/>

        <form onSubmit={getTopAthletes}>
          <h5>View top Athletes</h5>
          <div className="form-group">
            <div className="col-sm-5">
              <label htmlFor="total" className="form-label">Sort by:</label>
              <select onChange={onInputChange} className="form-select" name="disciplineForTopAthletes" id="disciplineForTopAthletes">
                {disciplinesAndTotal.map(total => <option key={total}>{total}</option>)}
              </select>
            </div>
          </div>
          <div className="from-group">
            <div className="col-sm-2">
              <label htmlFor="country" className="form-label">Filter by country</label>
              <select onChange={onInputChange} className="form-select" name="countryForTopAthletes" id="countryForTopAthletes">
                {countriesFilter.map(country => <option key={country}>{country}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form><br/>
        
        {topAthletes.length !== 0 &&
          <div>
            <br/><span>List of top Athletes for {topAthletes[0].discipline}:</span><br/>
            <span>{topAthletes.map(athletes => <>{athletes.athlete.firstName + " " + athletes.athlete.lastName + " (" + athletes.athlete.country + ") | score: " + athletes.score}<br/></>)}</span><br/>
          </div>
        }
    </div>
   </div>
  );
}

export default App;

import './App.css';
import { useEffect, useRef, useState } from 'react';
//test

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
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();
  const getCountryFilterRef = useRef();
  const setAthleteRef = useRef();
  const getAthleteRef = useRef();
  const getDisciplinesAndTotalRef = useRef();
  const disciplineRef = useRef();
  const resultRef = useRef();


  useEffect(() => {
    fetch("http://localhost:8080/countries")
    .then(res => res.json())
    .then(body => setCountries(body));
    fetch("http://localhost:8080/disciplines")
    .then(res => res.json())
    .then(body => setDisciplines(body));
    fetch("http://localhost:8080/disciplinesAndTotal")
    .then(res => res.json())
    .then(body => setDisciplinesAndTotal(body));
    fetch("http://localhost:8080/countriesFilter")
    .then(res => res.json())
    .then(body => setCountriesFilter(body));
    getAthletes();
  }, [])

  function setAthlete(event) {
    event.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const age = ageRef.current.value;
    const country = countryRef.current.value;
    fetch("http://localhost:8080/registration?firstname=" + firstName + "&lastname=" + lastName + "&age=" + age + "&country=" + country, {method: "POST"}) 
    .then(res => res.text())
    .then(body => {
      setResponseAthlete(body)
      getAthletes();
    });
    
  }

  function getAthletes() {
    fetch("http://localhost:8080/athletes")
    .then(res => res.json())
    .then(body => setAthletes(body));
  }

  function setResult(event) {
    event.preventDefault();
    const athleteUuid = setAthleteRef.current.value;
    const discipline = disciplineRef.current.value;
    const result = resultRef.current.value;
    fetch("http://localhost:8080/setResults?athlete=" + athleteUuid + "&discipline=" + discipline + "&result=" + result, {method: "POST"})
    .then(res => res.text())
    .then(body => setResponseResult(body));
  }

  function getResults(event) {
    event.preventDefault();
    const athleteUuid = getAthleteRef.current.value;
    fetch("http://localhost:8080/getResults?athlete=" + athleteUuid)
    .then(res => res.json())
    .then(body => setAthleteResults(body));
    fetch("http://localhost:8080/getScore?athlete=" + athleteUuid)
    .then(res => res.json())
    .then(body => setResponseScore(body));
  }

  function getTopAthletes(event) {
    event.preventDefault();
    const discipline = getDisciplinesAndTotalRef.current.value;
    const country = getCountryFilterRef.current.value;
    fetch("http://localhost:8080/getTopAthletes?discipline=" + discipline + "&country=" + country)
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
              <input ref={firstNameRef} type="text" id="firstname" name="firstname" placeholder="first name" className="form-control"></input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last name:</label>
            <div className="col-sm-5">
              <input ref={lastNameRef} type="text" id="lastname" name="lastname" placeholder="last name" className="form-control"></input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <div className="col-sm-2">
              <input ref={ageRef} type="number" id="age" name="age" placeholder="age" className="form-control"></input>
            </div>
          </div>
          <div className="from-group">
            <div className="col-sm-2">
              <label htmlFor="country" className="form-label">Country</label>
              <select ref={countryRef} className="form-select" name="country" id="country">
                {countries.map(country => <option key={country}>{country}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3"Submit>Submit</button>
          <br/><span> {responseAthlete} </span>
        </form><br/>

        <form onSubmit={setResult}>
          <h5>Add results to athletes</h5>
          <div className="form-group">
            <div className="col-sm-5">
              <label htmlFor="athlete" className="form-label">Select an athlete:</label>
              <select ref={setAthleteRef} className="form-select" name="athlete" id="athlete">
                {athletes.map(athlete => <option key={athlete} value={athlete.uuid}>{athlete.firstName + " " + athlete.lastName + " (" + athlete.country + ")"}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-5">
              <label htmlFor="discipline" className="form-label">Select a discipline:</label>
              <select ref={disciplineRef} className="form-select" name="discipline" id="discipline">
                {disciplines.map(discipline => <option key={discipline}>{discipline}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="result">Result:</label>
            <div className="col-sm-2">
              <input ref={resultRef} type="number" id="result" name="result" placeholder="result" className="form-control"></input>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3"Submit>Submit</button>
          <br/><span> {responseResult} </span>
        </form><br/>

        <form onSubmit={getResults}>
          <h5>View athletes results</h5>
          <div className="form-group">
            <div className="col-sm-5">
              <label htmlFor="athlete" className="form-label">Select an athlete:</label>
              <select ref={getAthleteRef} className="form-select" name="athlete" id="athlete">
                {athletes.map(athlete => <option key={athlete} value={athlete.uuid}>{athlete.firstName + " " + athlete.lastName + " (" + athlete.country + ")"}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3"Submit>Submit</button>
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
              <select ref={getDisciplinesAndTotalRef} className="form-select" name="total" id="total">
                {disciplinesAndTotal.map(total => <option key={total}>{total}</option>)}
              </select>
            </div>
          </div>
          <div className="from-group">
            <div className="col-sm-2">
              <label htmlFor="country" className="form-label">Filter by country</label>
              <select ref={getCountryFilterRef} className="form-select" name="country" id="country">
                {countriesFilter.map(country => <option key={country}>{country}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3"Submit>Submit</button>
        </form>
        <br/>
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

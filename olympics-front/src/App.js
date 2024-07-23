import './App.css';
import { useEffect, useState } from 'react';
import AthleteRegistraionForm from './components/AthleteRegistraionForm';
import ResultRegistrationForm from './components/ResultRegistrationForm';
import ResultViewForm from './components/ResultViewForm';
import TopAthletesViewForm from './components/TopAthletesViewForm';

function App() {
  const[responseAthlete, setResponseAthlete] = useState([]);
  const[countries, setCountries] = useState([]);
  const[countriesFilter, setCountriesFilter] = useState([]);
  const[athletes, setAthletes] = useState([]);
  const[disciplines, setDisciplines] = useState([]);
  const[disciplinesAndTotal, setDisciplinesAndTotal] = useState([]);
  const[formData, setFormData] = useState([]);

  // When the browser is first loaded, all necessary data is loaded from the server
  // initial selections of drop-down menus are inserted into formData
  useEffect(() => {
    const apiNames = ["country", "discipline", "disciplineForTopAthletes", "countryForTopAthletes"]
    const setters = {
      country: setCountries,
      discipline: setDisciplines,
      disciplineForTopAthletes: setDisciplinesAndTotal,
      countryForTopAthletes: setCountriesFilter
    };
    apiNames.forEach(apiName => {
      fetch("http://localhost:8080/" + apiName)
      .then(res => res.json())
      .then(body => {
        setters[apiName](body);
        setFormData(prev => ({...prev, [apiName]: body[0]}));
      });
    });
    getAthletes();
  }, [])

  // This function stores each change made, character by character, into the formData when a form is being filled
  // When the form is being submitted, the required values can be read by calling the corresponding names
  function onInputChange(e) {
    setFormData(prev => ({...prev, [e.target.id]: e.target.value}));
    console.log(formData);
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
  
  return (
   <div className="App">
    <div className="container mt-3">
      <AthleteRegistraionForm 
        setAthlete={setAthlete} 
        onInputChange={onInputChange} 
        countries={countries} 
        responseAthlete={responseAthlete}/>
      <br/>
      <ResultRegistrationForm 
        onInputChange={onInputChange} 
        athletes={athletes} 
        disciplines={disciplines} 
        formData={formData}/>
      <br/>
      <ResultViewForm 
        formData={formData} 
        onInputChange={onInputChange} 
        athletes={athletes}/>
      <br/>
      <TopAthletesViewForm 
        formData={formData} 
        onInputChange={onInputChange} 
        disciplinesAndTotal={disciplinesAndTotal} 
        countriesFilter={countriesFilter}/>
      <br/>
    </div>
   </div>
  );
}

export default App;
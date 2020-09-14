import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Menu } from "@material-ui/core";
import Infobox from "./Infobox";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");

  // useEffect = Runs a function on a given condition
  // Only if the condition is changed (or a variable is changed) useEffect will run the function

  useEffect(() => {
    // async function -> send a request, wait for it, then do something with the info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          // Loop over the data and setting the variables to values from the data
          const countries = data.map((country) => ({
            name: country.country, // India, Afghanistan
            value: country.countryInfo.iso2, // IN, AF
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, [countries]);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app-dropdown">
          {/* Set the default value as country and on change of an event set the country as the country selected */}
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            {/* Loop over the countries */}
            <MenuItem value="Worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app-stats">
        <Infobox title="Coronavirus Cases" cases={123} total={2000} />

        <Infobox title="Recovered" cases={1234} total={3000} />

        <Infobox title="Deaths" cases={12345} total={4000} />
      </div>
    </div>
  );
}

export default App;

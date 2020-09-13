import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Menu } from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState(["USA", "INDIA"]);

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
            name: country.country,
            value: country.countryInfo.iso2,
          }));
        });
    };
  }, [countries]);

  return (
    <div className="app">
      <div className="app-header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app-dropdown">
          <Select variant="outlined" value="abc">
            {/* Loop over the countries */}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;

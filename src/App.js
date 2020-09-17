import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import Infobox from "./Infobox";
import Map from "./Map";
import Table from "./Table";
import "./App.css";
import { sortData } from "./util";
import LineGraph from "./LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  // Empty array means the callback function runs on page load
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Update the input field
        setCountry(countryCode);

        // All the data from the response, we're setting it to the countryInfo object
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app-left">
        <div className="app-header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app-dropdown">
            {/* Set the default value as country and on change of an event set the country as the country selected */}
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/* Loop over the countries */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app-stats">
          <Infobox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />

          <Infobox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          <Infobox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <Map />
      </div>
      <Card className="app-right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3>Worldwide new Cases</h3>
          {/* Graph */}
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

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
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 28.7041, lng: -77.1025 });
  const [mapZoom, setMapZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

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

          setMapCountries(data);
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

        countryCode === "worldwide"
          ? setMapCenter([28.7041, -77.1025])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);

        // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app-left">
        <div className="app-header">
          <h1>COVID-19 TRACKER</h1>
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
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />

          <Infobox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />

          <Infobox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app-right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3 className="app-graphTitle">Worldwide new {casesType}</h3>
          {/* Graph */}
          <LineGraph
            className="app-graph"
            casesType={casesType}
            active={casesType === "recovered"}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

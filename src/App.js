import React, { useState } from "react";
import { MenuItem, FormControl, Select, Menu } from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState(["USA", "INDIA"]);

  return (
    <div className="app">
      <div className="app-header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app-dropdown">
          <Select variant="outlined" value="abc">
            {/* Loop over the countries */}
            {countries.map((country) => (
              <MenuItem value="country">{country}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;

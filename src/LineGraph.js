import React, { useState, useEffect } from "react";

function LineGraph() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });

  return (
    <div>
      <h1>I'm a graph</h1>
      {/* <Line data /> */}
    </div>
  );
}

export default LineGraph;

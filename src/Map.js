import React from "react";
import { Map as CovidMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <CovidMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Loop through countries and draw circles */}
        {showDataMap(countries, casesType)}
      </CovidMap>
    </div>
  );
}

export default Map;

import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import "./Infobox.css";

function Infobox({ title, isRed, active, cases, total, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infobox ${active && "infobox--selected"} ${
        isRed && "infobox--red"
      }`}
    >
      <CardContent>
        {/* title */}
        <Typography className="infobox-title" color="textSecondary">
          {title}
        </Typography>

        {/* Number of Cases */}
        <h2 className={`infobox-cases ${!isRed && "infobox-cases-green"}`}>
          {cases}
        </h2>

        {/* Total */}
        <Typography className="infobox-total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Infobox;

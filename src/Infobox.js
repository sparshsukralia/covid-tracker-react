import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import "./Infobox.css";

function Infobox({ title, cases, total }) {
  return (
    <Card className="infobox">
      <CardContent>
        {/* title */}
        <Typography className="infobox-title" color="textSecondary">
          {title}
        </Typography>

        {/* Number of Cases */}
        <h2 className="infobox-cases">{cases}</h2>

        {/* Total */}
        <Typography className="infobox-total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Infobox;

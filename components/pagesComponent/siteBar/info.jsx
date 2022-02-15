import React from "react";
import { Typography } from "@mui/material";

export default function Info({ data, title }) {
  const isArr = Array.isArray(data);
  return (
    <div
      style={{
        paddingRight: "25px",
        padding: "8px 0px 8px 8px",
        alignItems: "baseline",
      }}
    >
      <Typography variant="body1">{title}</Typography>
      <Typography variant="subtitle2" color="textSecondary">
        {isArr ? data.join(", ") : data}
      </Typography>
    </div>
  );
}

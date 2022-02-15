import React from "react";
import { Typography } from "@mui/material";

export default function SiteBar({ title, children, cls = "" }) {
  return (
    <>
      <Typography variant="h5" className="sectionTitleBold">
        {title}
      </Typography>

      <div style={{ margin: "12px 12px 16px" }} className={cls}>
        {children}
      </div>
    </>
  );
}

import React from "react";

export default function SiteBar({ src }) {
  return (
    <>
      <img
        src={`https://shikimori.one${src}`}
        style={{ width: "100%", marginTop: "12px", borderRadius: "6px" }}
      />
    </>
  );
}

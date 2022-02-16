import React from "react";


export default function ScreenShot({ src }) {
  return (
    <>
      <img
        alt="ScreenShot"
        src={`https://shikimori.one${src}`}
        style={{ width: "100%", marginTop: "12px", borderRadius: "6px" }}
      />
    </>
  );
}

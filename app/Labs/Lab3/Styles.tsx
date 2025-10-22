// app/Labs/Lab3/Styles.tsx
"use client";
import React from "react";

export default function Styles() {
  // Define reusable style objects
  const colorBlack = { color: "black" };
  const padding10px = { padding: "10px" };

  const bgBlue = { 
    backgroundColor: "lightblue",
    color: "black",
    ...padding10px, // merge padding
  };

  const bgRed = {
    backgroundColor: "lightcoral",
    ...colorBlack,  // merge black color
    ...padding10px, // merge padding
  };

  return (
    <div id="wd-styles">
      <h2>Styles</h2>

      {/* Inline JSON object literal */}
      <div style={{ backgroundColor: "lightyellow", color: "black", padding: "10px" }}>
        Yellow background
      </div>

      {/* Using pre-defined style objects */}
      <div style={bgRed}>Red background</div>
      <div style={bgBlue}>Blue background</div>
    </div>
  );
}

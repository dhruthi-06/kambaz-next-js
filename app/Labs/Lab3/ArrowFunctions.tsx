"use client";
import React from "react";

const subtract = (a: number, b: number) => a - b;

export default function ArrowFunctions() {
  const threeMinusOne = subtract(3, 1);

  return (
    <div id="wd-arrow-functions">
      <h4>New ES6 Arrow Functions</h4>
      threeMinusOne = {threeMinusOne} <br />
      subtract(3, 1) = {subtract(3, 1)} <hr />
    </div>
  );
}

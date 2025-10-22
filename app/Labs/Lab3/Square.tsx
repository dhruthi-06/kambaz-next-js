"use client";
import React, { ReactNode } from "react";

export default function Square({ children }: { children: ReactNode }) {
  const num = Number(children); // Convert the body content to a number
  return <span id="wd-square">{num * num}</span>; // Render the square
}

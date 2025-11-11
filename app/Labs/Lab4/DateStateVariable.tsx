"use client";
import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";

export default function DateStateVariable() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  // ✅ Set the initial date only on the client
  useEffect(() => {
    setStartDate(new Date());
  }, []);

  const dateObjectToHtmlDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // ✅ Prevent rendering before hydration
  if (!startDate) return null;

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>
      <h3>{JSON.stringify(startDate)}</h3>
      <h3>{dateObjectToHtmlDateString(startDate)}</h3>
      <FormControl
        type="date"
        value={dateObjectToHtmlDateString(startDate)}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <hr />
    </div>
  );
}

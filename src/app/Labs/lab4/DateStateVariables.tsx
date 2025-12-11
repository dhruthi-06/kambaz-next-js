"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
export default function DateStateVariables () {
    const [startDate, setstartDate] = useState(new Date);
    const dateObjectToHtmlDateString = (date : Date) => {
        return `${date.getFullYear()}-${date.getMonth()+1<10?0:""}${date.getMonth()+1}-${date.getDate()<10?0:""}${date.getDate()}`;
    }
    return (
        <div id="wd-date-variable">
            <h3>Date State Variables</h3>
            <h5>{JSON.stringify(startDate)}</h5>
            <h5>{dateObjectToHtmlDateString(startDate)}</h5>
            <FormControl type="date" defaultValue={dateObjectToHtmlDateString(startDate)} onChange={(e) => setstartDate(new Date(e.target.value))}/>
            <hr/>
        </div>
    );
}
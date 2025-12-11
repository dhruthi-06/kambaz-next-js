import { useState } from "react";
import { FormControl } from "react-bootstrap";
export default function StringStateVariables () {
    const [firstname, setfirstname] = useState("John");
    return (
        <div id="wd-string-variables">
            <h3>String State variables</h3>
            <p>{firstname}</p>
            <FormControl defaultValue={firstname} onChange={(e) => setfirstname(e.target.value)}/>
            <hr/>
        </div>
    );
}
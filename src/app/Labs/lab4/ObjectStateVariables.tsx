import { useState } from "react";
import { FormControl } from "react-bootstrap";
export default function ObjectStateVariables () {
    const [person, setperson] = useState({name : "Peter", age : 21});
    return (
        <div id="wd-object-variables">
            <h3>Object State Variables</h3>
            <pre>{JSON.stringify(person,null,2)}</pre>
            <FormControl className="mt-3" defaultValue={person.name} onChange={(e) => setperson({...person, name : e.target.value})}/>
            <FormControl className="mt-3" defaultValue={person.age} onChange={(e) => setperson({...person, age : parseInt(e.target.value)})}/>
            <hr/>
        </div>
    );
}
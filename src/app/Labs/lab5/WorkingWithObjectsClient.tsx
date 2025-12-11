"use client";
import React, {useState} from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjectsClient () {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "NodeJS server with Express server",
        due: "2020-10-01", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: 1, name: "NodeJS Module",
        description: "Work with NodeJS server and ExpressJS server",
        due: "2020-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
    const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`
    return (
        <div id="wd-lab5-working-with-object">
            <h3>Working with Objects</h3>
            <br/>
            <h4>Retrieving Objects</h4>
            <a id="wd-lab5-retrieve-assignment" className="btn btn-primary" href={`${HTTP_SERVER}/lab5/assignment`}>Get Assignment</a>
            <br/><br/>
            <h4>Retrieving Properties</h4>
            <a id="wd-lab5-retrieve-title" className="btn btn-primary" href={`${HTTP_SERVER}/lab5/assignment/title`}>Get Assignment Title</a>
            <br/><br/>
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title" className="btn btn-primary float-end" href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>Update Assignment Title</a>
            <FormControl className="w-50" id="wd-assignment-title" defaultValue={assignment.title} onChange={(e) => setAssignment({...assignment, title:e.target.value})}/>
            <br/>
            <h4> Retrieving Module Objects</h4>
            <a id="wd-lab5-retrieve-module" className="btn btn-primary" href={`${HTTP_SERVER}/lab5/module`}>Get Module</a>
            <br/><br/>
            <h4>Retrieving Module Name</h4>
            <a id="wd-lab5-retrieve-module-title" className="btn btn-primary" href={`${HTTP_SERVER}/lab5/module/name`}>Get Module Name</a>
            <br/><br/>
            <h4>Modifying Module Name</h4>
            <a id="wd-update-module-title" className="btn btn-primary float-end" href={`${MODULE_API_URL}/name/${module.name}`}>Update Module Name</a>
            <FormControl className="w-50" id="wd-module-title" defaultValue={module.name} onChange={(e) => setModule({...module, name:e.target.value})}/>
            <hr/>
        </div>
    );

}
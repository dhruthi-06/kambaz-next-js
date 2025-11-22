"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;

  const [moduleObj, setModuleObj] = useState({
    id: "m101",
    name: "Intro to Node",
    description: "Basics of Node.js and Express",
    course: "CS5610",
  });

  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>


      <h4>Retrieving Objects</h4>

      <a className="btn btn-primary me-2" href={`${ASSIGNMENT_API_URL}`}>
        Get Assignment
      </a>

      <a className="btn btn-secondary" href={`${ASSIGNMENT_API_URL}/title`}>
        Get Assignment Title
      </a>

      <hr />

 
      <h4>Module Object</h4>

      <a className="btn btn-primary me-2" href={`${MODULE_API_URL}`}>
        Get Module
      </a>

      <a className="btn btn-secondary" href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>

      <hr />

 
      <h4>Modify Assignment Title</h4>

      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      <a
        id="wd-update-assignment-title"
        className="btn btn-primary mt-2"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>

      <hr />

      
      <h4>Modify Assignment Score</h4>

      <FormControl
        type="number"
        className="w-75 mb-2"
        id="wd-assignment-score"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: Number(e.target.value) })
        }
      />

      <a
        id="wd-update-assignment-score"
        className="btn btn-primary mt-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>

      <hr />

      <h4>Modify Assignment Completed</h4>

      <div className="mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="wd-assignment-completed"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({
              ...assignment,
              completed: e.target.checked,
            })
          }
        />
        <label className="ms-2">Completed</label>
      </div>

      <a
        id="wd-update-assignment-completed"
        className="btn btn-primary mt-2"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>

      <hr />

   
      <h4>Modify Module Name</h4>

      <FormControl
        className="w-75 mb-2"
        id="wd-module-name"
        defaultValue={moduleObj.name}
        onChange={(e) => setModuleObj({ ...moduleObj, name: e.target.value })}
      />

      <a
        id="wd-update-module-name"
        className="btn btn-primary mt-2"
        href={`${MODULE_API_URL}/name/${moduleObj.name}`}
      >
        Update Module Name
      </a>

      <hr />

    
      <h4>Modify Module Description</h4>

      <FormControl
        className="w-75 mb-2"
        id="wd-module-description"
        defaultValue={moduleObj.description}
        onChange={(e) =>
          setModuleObj({ ...moduleObj, description: e.target.value })
        }
      />

      <a
        id="wd-update-module-description"
        className="btn btn-primary mt-2"
        href={`${MODULE_API_URL}/description/${moduleObj.description}`}
      >
        Update Description
      </a>

      <hr />
    </div>
  );
}

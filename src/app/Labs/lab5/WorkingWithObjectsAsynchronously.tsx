"use client";
import React, {useState, useEffect} from "react";
import * as client from "./client";
import { FormControl } from "react-bootstrap";
interface Assignment {
  id: string;
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;
  due?: string;        
  completed?: boolean; 
}
export default function WorkingWithObjectsAsynchronously () {
    const [assignment, setAssignment] = useState<Assignment>({
        id: "",
        title: "",
        description: "",
        points: 0,
        dueDate: ""
    });
    const fetchAssignment = async () => {
        const assignment = await client.fetchAssignment();
        setAssignment(assignment);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);
    const updateTitle = async (title:string) => {
        const updatedAssignment = await client.updateTitle(title);
        setAssignment(updatedAssignment);
    };
 return (
    <div id="wd-asynchronous-objects">
        <h3>Working With Objects Asynchronously</h3>
        <h4>Assignment</h4>
        <FormControl defaultValue={assignment.title} className="mb-2" onChange={(e) => setAssignment({...assignment, title:e.target.value})}/>
        <FormControl defaultValue={assignment.description} className="mb-2" onChange={(e) => setAssignment({...assignment, description:e.target.value})}/>
        <FormControl defaultValue={assignment.due} className="mb-2" onChange={(e) => setAssignment({...assignment, due:e.target.value})}/>
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="wd-completed" defaultChecked={assignment.completed} onChange={(e) => setAssignment({...assignment, completed:e.target.checked})}/>
        <label className="form-check-label" htmlFor="wd-completed">Completed</label>
        </div>
        <button className="btn btn-primary me-2" onClick={() => updateTitle(assignment.title)}>Update Title</button>
        <pre>{JSON.stringify(assignment,null,2)}</pre>
        <hr/>
    </div>
 );   
}
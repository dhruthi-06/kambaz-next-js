"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;

  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h2>Working with Arrays</h2>

      <h3>Retrieving Arrays</h3>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      <h3>Retrieving an Item from an Array by ID</h3>

      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>

      <FormControl
        id="wd-todo-id"
        className="w-50"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h3>Deleting from an Array</h3>

      <a
        id="wd-remove-todo"
        className="btn btn-danger float-end"
        href={`${API}/${todo.id}/delete`}
      >
        Remove Todo with ID = {todo.id}
      </a>

      <FormControl
        className="w-50"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h3>Updating Title</h3>

      <a
        id="wd-update-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Todo
      </a>

      <FormControl
        className="w-25 float-start me-2"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />

      <FormControl
        className="w-50 float-start"
        defaultValue={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />

      <br />
      <br />
      <hr />

      <h3>Updating Description & Completed</h3>

      <a
        id="wd-update-todo-completed"
        className="btn btn-warning float-end ms-2"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Update Completed
      </a>

      <a
        id="wd-update-todo-description"
        className="btn btn-secondary float-end"
        href={`${API}/${todo.id}/description/${todo.description}`}
      >
        Update Description
      </a>

      <FormControl
        className="w-25 float-start me-2"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />

      <FormControl
        className="w-50 float-start me-2"
        defaultValue={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />

      <div className="form-check float-start mt-2">
        <input
          id="wd-todo-completed"
          type="checkbox"
          className="form-check-input"
          checked={todo.completed}
          onChange={(e) =>
            setTodo({ ...todo, completed: e.target.checked })
          }
        />
        <label className="form-check-label ms-1">Completed</label>
      </div>

      <br />
      <br />
      <hr />

      {/** -------------------------------------------------------------- */}
      {/** NEW REQUIREMENTS: POST + COMPLETED TODOS                      */}
      {/** -------------------------------------------------------------- */}

    

      <a
        id="wd-create-todo-post"
        className="btn btn-success me-3"
        href={`${API}`} // Browser will still hit the POST override tool
        onClick={(e) => {
          // prevent navigation
          e.preventDefault();
          fetch(`${API}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: "New Todo",
              description: "",
              completed: false,
            }),
          }).then(() => alert("Created new todo using POST!"));
        }}
      >
        Create New Todo (POST)
      </a>

      <hr />

      <a
        id="wd-get-completed-todos"
        className="btn btn-info"
        href={`${API}/completed`}
      >
        Get Completed Todos
      </a>

      <hr />
    </div>
  );
}

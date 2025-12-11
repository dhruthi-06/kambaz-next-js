"use client";
import React, {useState} from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithArraysClient () {
    const API = `${HTTP_SERVER}/lab5/todos`;
    const [todo, setTodo] = useState({
        id: "1", title: "NodeJS Assignment",
        description: "Create NodeJS server",
        due: "2021-09-09", completed: false,
    });
    return (
        <div id="wd-lab5-working-with-arrays">
            <h3>Working With Arrays</h3>
            <br/>
            <h4>Retrieving Arrays</h4>
            <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>Get Todos</a>
            <br/><br/>
            <h4>Retrieving Array Item by ID</h4>
            <FormControl id="wd-todo-id" defaultValue={todo.id} className="w-50 float-start me-2" onChange={(e) => setTodo({...todo, id: e.target.value})}/>
            <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end" href={`${API}/${todo.id}`}>Get Todo by ID</a>     
            <br/><br/>
            <h4>Filtering Array Items</h4>
            <a id="wd-retrieve-completed-todos" className="btn btn-primary" href={`${API}?completed=true`}>Get Completed Todos</a>
            <br/><br/>
            <h4>Creating New Items in Array</h4>
            <a id="wd-create-new-todo" className="btn btn-primary" href={`${API}/create`}>Create Todo</a>
            <br/><br/>
            <h4>Deleting from an Array</h4>
            <FormControl id="wd-delete-todo-id" defaultValue={todo.id} className="w-50 float-start me-2" onChange={(e) => setTodo({...todo, id: e.target.value})}/>
            <a id="wd-delete-item-todo" className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>Remove Todo with id = {todo.id}</a>
            <br/><br/>
            <h4>Updating the title in array</h4>
            <FormControl id="wd-update-todo-id" defaultValue={todo.id} className="w-25 float-start me-2" onChange={(e) => setTodo({...todo, id:e.target.value})}/>
            <FormControl id="wd-update-todo-title" defaultValue={todo.title} className="w-50 float-start me-2" onChange={(e) => setTodo({...todo, title:e.target.value})}/>
            <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary float-end">Update Title</a>
            <br/><br/>
            <h4>Updating the Description in array</h4>
            <FormControl id="wd-update-todo-id-updation" defaultValue={todo.id} className="w-25 float-start me-2" onChange={(e) => setTodo({...todo, id:e.target.value})}/>
            <FormControl id="wd-update-todo-description" className="w-50 float-start me-2" defaultValue={todo.description} onChange={(e) => setTodo({...todo, description:e.target.value})}/>
            <a href={`${API}/${todo.id}/description/${todo.description}`} className="btn btn-primary float-end">Update Des</a>
            <br/><br/>
            <h4>Updating the Completed Status in array</h4>
            <FormControl id="wd-update-todo-id-completed" defaultValue={todo.id} className="w-25 float-start me-2" onChange={(e) => setTodo({...todo, id:e.target.value})}/>
            <input id="wd-update-todos-completed" type="checkbox" checked={todo.completed} className="form-check-input float-start me-2" onChange={(e) => setTodo({...todo, completed:e.target.checked})}/>
            <button onClick={() => window.location.href = `${API}/${todo.id}/completed/${todo.completed}`} className="btn btn-primary float-end">
            Update Completed</button>
            <br/><br/>
        </div>
    );
}
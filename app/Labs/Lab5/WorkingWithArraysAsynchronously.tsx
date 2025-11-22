"use client";

import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
  };

  const removeTodo = async (todo: any) => {
    const updated = await client.removeTodo(todo);
    setTodos(updated);
  };

  const createNewTodo = async () => {
    const updated = await client.createNewTodo();
    setTodos(updated);
  };

  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
      description: "",
    });
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const updated = todos.filter((t) => t.id !== todo.id);
      setTodos(updated);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response?.data?.message);
    }
  };

  const editTodo = (todo: any) => {
    const updated = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updated);
  };

  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mt-2 mb-2"
        >
          {errorMessage}
        </div>
      )}

      <h4>
        Todos{" "}
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
          style={{ cursor: "pointer" }}
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
          style={{ cursor: "pointer" }}
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            {/* DELETE (GET delete version) */}
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
              style={{ cursor: "pointer" }}
            />

            {/* DELETE (DELETE version) */}
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
              style={{ cursor: "pointer" }}
            />

            {/* EDIT ICON */}
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-3 mt-1"
              style={{ cursor: "pointer" }}
            />

            {/* COMPLETED CHECKBOX */}
            <input
              type="checkbox"
              className="form-check-input me-2 float-start"
              defaultChecked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />

            {/* TITLE FIELD / EDIT MODE */}
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
                onChange={(e) =>
                  updateTodo({ ...todo, title: e.target.value })
                }
              />
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}

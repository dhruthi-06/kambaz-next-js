import React from "react";
import TodoItem from "./todoItem";
import TodoForm from "./todoForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ListGroup } from "react-bootstrap";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todo.todos); // ✅ correct path

  return (
    <div>
      <h2>Todo List</h2>
      <TodoForm />
      <ListGroup>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}

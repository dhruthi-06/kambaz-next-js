"use client";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { RootState } from "../../store";

export default function TodoList() {
  // Redux gives you todos automatically
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  return (
    <div
      id="wd-todo-list-redux"
      className="mb-4"
      style={{ width: "70%", minWidth: "450px" }}
    >
      <h2>Todo List (Redux)</h2>
      <ListGroup>
        {/* Add and update now handled inside TodoForm */}
        <TodoForm />
        {/* Each TodoItem now dispatches its own delete/edit */}
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
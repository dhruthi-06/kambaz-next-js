import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem key={todo.id}>
        <span className="me-2">{todo.title}</span>
      <Button onClick={() => dispatch(deleteTodo(todo.id))} id="wd-delete-todo" className="btn btn-danger me-2">
        Delete
      </Button>
      <Button onClick={() => dispatch(setTodo(todo))} id="wd-set-todo" className="btn btn-primary me-2">
        Edit
      </Button>
    </ListGroupItem>
  );
}

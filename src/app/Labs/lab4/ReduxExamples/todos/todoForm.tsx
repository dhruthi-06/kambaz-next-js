import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";
import { FormControl, ListGroupItem, Button } from "react-bootstrap";

export default function TodoForm() {
  const todo = useSelector((state: RootState) => state.todo.todo); // ✅ correct path
  const dispatch = useDispatch();

  return (
    <ListGroupItem>
        <FormControl 
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
      <Button onClick={() => dispatch(addTodo())} id="wd-add-todo-button" className="mt-2 mb-2 me-2 btn-success">
        Add Item
      </Button>
      <Button onClick={() => dispatch(updateTodo(todo))} id="wd-update-todo-button"className="mt-2 mb-2 me-2 btn-warning">
        Update Item
      </Button>
    </ListGroupItem>
  );
}

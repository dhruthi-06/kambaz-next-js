import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

export default function TodoForm() {
  // Select the current todo from Redux state
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="d-flex gap-2 align-items-center">
      <FormControl
        className="flex-grow-1"
        placeholder="Enter todo"
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
      <Button
        variant="success"
        size="sm"
        id="wd-add-todo-click"
        onClick={() => dispatch(addTodo(todo))}
      >
        Add
      </Button>
      <Button
        variant="warning"
        size="sm"
        id="wd-update-todo-click"
        onClick={() => dispatch(updateTodo(todo))}
      >
        Update
      </Button>
    </ListGroupItem>
  );
}
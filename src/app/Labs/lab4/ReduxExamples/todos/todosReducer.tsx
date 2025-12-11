import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "-1", title: "Learn Mongo" },
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state) => {
      const timeStamp = new Date().toISOString();
      const newTodo = { id: timeStamp, title: state.todo.title };
      state.todos.push(newTodo);
      state.todo = { id: "", title: "" };
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      state.todo = { id: "", title: "" };
    },
    setTodo: (state, action) => {
      state.todo = action.payload; // ✅ set current todo, not overwrite array
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, setTodo } = todoSlice.actions;
export default todoSlice.reducer;

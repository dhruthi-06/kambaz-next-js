import axios from "axios";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const api = axios.create({
  baseURL: HTTP_SERVER,
});

// -------------------------------
// 5.2.5.3 Welcome Message
// -------------------------------
export const fetchWelcomeMessage = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};

// -------------------------------
// 5.2.5.5 Working with Assignment Object Asynchronously
// -------------------------------
const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;

export const fetchAssignment = async () => {
  const response = await axios.get(`${ASSIGNMENT_API}`);
  return response.data;
};

export const updateTitle = async (title: string) => {
  const response = await axios.get(`${ASSIGNMENT_API}/title/${title}`);
  return response.data;
};

// -------------------------------
// 5.2.5.6 Todos
// -------------------------------
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;

export const fetchTodos = async () => {
  const response = await axios.get(TODOS_API);
  return response.data;
};

// -------------------------------
// 5.2.5.7 Delete Todo
// -------------------------------
export const removeTodo = async (todo: any) => {
  const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
  return response.data;
};

// -------------------------------
// 5.2.5.8 Create (GET)
// -------------------------------
export const createNewTodo = async () => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data;
};

// -------------------------------
// 5.2.6.1 Create (POST)
// -------------------------------
export const postNewTodo = async (todo: any) => {
  const response = await axios.post(`${TODOS_API}`, todo);
  return response.data;
};

// -------------------------------
// 5.2.6.2 Delete (DELETE)
// -------------------------------
export const deleteTodo = async (todo: any) => {
  const response = await axios.delete(`${TODOS_API}/${todo.id}`);
  return response.data;
};

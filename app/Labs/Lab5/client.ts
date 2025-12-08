import axios from "axios";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const api = axios.create({
  baseURL: HTTP_SERVER,
});

// -----------------------------
// Welcome Message
// -----------------------------
export const fetchWelcomeMessage = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};

// -----------------------------
// Assignment API
// -----------------------------
const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;

export const fetchAssignment = async () => {
  const response = await axios.get(`${ASSIGNMENT_API}`);
  return response.data;
};

export const updateTitle = async (title: string) => {
  const response = await axios.get(`${ASSIGNMENT_API}/title/${title}`);
  return response.data;
};

// -----------------------------
// TODOS API
// -----------------------------
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;

export const fetchTodos = async () => {
  const response = await axios.get(TODOS_API);
  return response.data;
};

// NEW — GET COMPLETED TODOS
export const fetchCompletedTodos = async () => {
  const response = await axios.get(`${TODOS_API}/completed`);
  return response.data;
};

// OLD REMOVE (GET /delete)
export const removeTodo = async (todo: any) => {
  const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
  return response.data;
};

// OLD CREATE (GET /create)
export const createNewTodo = async () => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data;
};

// NEW CREATE (POST)
export const postNewTodo = async (todo: any) => {
  const response = await axios.post(`${TODOS_API}`, todo);
  return response.data;
};

// NEW DELETE (DELETE)
export const deleteTodo = async (todo: any) => {
  const response = await axios.delete(`${TODOS_API}/${todo.id}`);
  return response.data;
};

// NEW UPDATE (PUT)
export const updateTodo = async (todo: any) => {
  const response = await axios.put(`${TODOS_API}/${todo.id}`, todo);
  return response.data;
};

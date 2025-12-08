import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

const api = axios.create({
  withCredentials: true,
  baseURL: HTTP_SERVER
});


export const signin = async (credentials: any) => {
  const response = await api.post(`/api/users/signin`, credentials);
  return response.data;
};

export const signup = async (user: any) => {
  const response = await api.post(`/api/users/signup`, user);
  return response.data;
};

export const profile = async () => {
  const response = await api.post(`/api/users/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await api.post(`/api/users/signout`);
  return response.data;
};


export const updateUser = async (user: any) => {
  const response = await api.put(`/api/users/${user._id}`, user);
  return response.data;
};


export const findAllUsers = async () => {
  const response = await api.get(`/api/users`);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await api.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await api.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await api.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/api/users/${userId}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await api.post(`/api/users`, user);
  return response.data;
};


import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HTTP_SERVER,
  withCredentials: true
});


export const signin = async (credentials: any) => {
  const response = await api.post(`/api/users/signin`, credentials);
  return response.data;
}



export const signup = async (user: any) => {
  const response = await api.post(`/api/users/signup`, user);
  return response.data;
};


export const profile = async () => {
  const response = await api.post(`/api/users/profile`);
  return response.data;
};


export const signout = async () => {
  await api.post(`/api/users/signout`);
};

export const updateUser = async (user: any) => {
  const response = await api.put(`/api/users/${user._id}`, user);
  return response.data;
};

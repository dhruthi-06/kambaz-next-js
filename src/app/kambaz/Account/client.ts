import axios from "axios";

export interface User {
  _id?: string;
  username: string;
  password?: string; 
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string; 
  role?: "STUDENT" | "FACULTY" | "ADMIN" | "TA";
  section?: string;
  loginId?: string;
  lastActivity?: string;
  totalActivity?: string;
}

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER_RAW = process.env.NEXT_PUBLIC_HTTP_SERVER || 'http://localhost:4000';
export const HTTP_SERVER = HTTP_SERVER_RAW.replace(/\/$/, ''); 
export const USERS_API = `${HTTP_SERVER}/api/users`;

console.log('API Configuration:', { HTTP_SERVER, USERS_API });

export const signin = async (credentials: { username: string; password: string }): Promise<User> => {
  const response = await axiosWithCredentials.post<User>(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const signup = async (user: User): Promise<User> => {
  const response = await axiosWithCredentials.post<User>(`${USERS_API}/signup`, user);
  return response.data;
};

export const signout = async (): Promise<void> => {
  await axiosWithCredentials.post(`${USERS_API}/signout`);
};

export const profile = async (): Promise<User> => {
  const response = await axiosWithCredentials.get<User>(`${USERS_API}/profile`);
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  if (!user._id) throw new Error("User _id is required to update");
  const response = await axiosWithCredentials.put<User>(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const findAllUsers = async (): Promise<User[]> => {
  const response = await axiosWithCredentials.get<User[]>(USERS_API);
  return response.data;
};

export const findUsersByRole = async (role: User["role"]): Promise<User[]> => {
  const response = await axiosWithCredentials.get<User[]>(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string): Promise<User[]> => {
  const response = await axiosWithCredentials.get<User[]>(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string): Promise<User> => {
  const response = await axiosWithCredentials.get<User>(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
};

export const createUser = async (user: User): Promise<User> => {
  const response = await axiosWithCredentials.post<User>(USERS_API, user);
  return response.data;
};
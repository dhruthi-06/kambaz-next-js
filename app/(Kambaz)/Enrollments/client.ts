import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HTTP_SERVER,
  withCredentials: true,
});

export const enroll = async (userId: string, courseId: string) => {
  const response = await api.post("/api/enrollments/enroll", {
    user: userId,
    course: courseId,
  });
  return response.data;
};

export const unenroll = async (userId: string, courseId: string) => {
  const response = await api.post("/api/enrollments/unenroll", {
    user: userId,
    course: courseId,
  });
  return response.data;
};

export const getUserEnrollments = async (userId: string) => {
  const response = await api.get(`/api/enrollments/user/${userId}`);
  return response.data;
};

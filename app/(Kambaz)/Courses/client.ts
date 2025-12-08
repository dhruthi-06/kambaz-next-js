import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HTTP_SERVER,
  withCredentials: true,
});

// --- COURSES ---
export const fetchAllCourses = async () => {
  const { data } = await api.get(`/api/courses`);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await api.get(`/api/users/current/courses`);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await api.post(`/api/courses`, course);
  return data;
};


export const deleteCourse = async (id: string) => {
  const { data } = await api.delete(`/api/courses/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await api.put(`/api/courses/${course._id}`, course);
  return data;
};

// --- MODULES ---
export const findModulesForCourse = async (courseId: string) => {
  const { data } = await api.get(`/api/courses/${courseId}/modules`);
  return data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const { data } = await api.post(`/api/courses/${courseId}/modules`, module);
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const { data } = await api.delete(
    `/api/courses/${courseId}/modules/${moduleId}`
  );
  return data;
};

export const updateModule = async (courseId: string, module: any) => {
  const { data } = await api.put(
    `/api/courses/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

// --- ASSIGNMENTS ---
export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await api.get(`/api/courses/${courseId}/assignments`);
  return data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
  const { data } = await api.post(`/api/courses/${courseId}/assignments`, assignment);
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await api.put(`/api/assignments/${assignment._id}`, assignment);
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await api.delete(`/api/assignments/${assignmentId}`);
  return data;
};

// --- ENROLLMENTS ---
export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return data;

  
};

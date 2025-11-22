import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_HTTP_SERVER,
});

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`; 
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/courses`;
const SINGLE_ASSIGNMENT_API = `${HTTP_SERVER}/api/assignments`;

 
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`/api/users/current/courses`);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`/api/users/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};


export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/modules`, module);
  return data;
};

export const deleteModule = async (moduleId: string) => {
  const { data } = await axios.delete(`${MODULES_API}/${moduleId}`);
  return data;
};

export const updateModule = async (module: any) => {
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data;
};


export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${HTTP_SERVER}/api/courses/${courseId}/assignments`);
  return data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axios.post(`${HTTP_SERVER}/api/courses/${courseId}/assignments`, assignment);
  return data;
};


export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(
    `${SINGLE_ASSIGNMENT_API}/${assignment._id}`,
    assignment
  );
  return data;
};


export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(
    `${SINGLE_ASSIGNMENT_API}/${assignmentId}`
  );
  return data;
};
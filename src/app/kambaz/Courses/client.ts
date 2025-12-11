import axios from "axios";
import type { Course } from "./reducer";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

export interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

export interface Lesson {
  _id: string;
  name: string;
}

export interface Assignment {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  assignmentGroup: string;
  displayGradeAs: string;
  submissionType: string;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  textEntry: boolean;
  websiteUrl: boolean;
  mediaRecordings: boolean;
  studentAnnotation: boolean;
  fileUploads: boolean;
}

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}`);
  return data;
};

export const findMyCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const createCourse = async (course: Omit<Course, "_id">): Promise<Course> => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string): Promise<void> => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string): Promise<Module[]> => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: Omit<Module, "_id">): Promise<Module> => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, module);
  return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string): Promise<void> => {
  const response = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
  return response.data;
};

export const updateModule = async (
  courseId: string, moduleId: string, updates: Partial<Omit<Module, "_id">>
) => {
  console.log("PUT URL:", `${COURSES_API}/${courseId}/modules/${moduleId}`);
  console.log("PUT BODY:", updates);

  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/modules/${moduleId}`,
    updates
  );
  return response.data;
};

export const fetchUserEnrollments = async (userId: string) => {
  try {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/enrollments`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch enrollments:", error);
    return [];
  }
};

export const findAssignmentsForCourse = async (courseId: string): Promise<Assignment[]> => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Omit<Assignment, "_id">
): Promise<Assignment> => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return response.data;
};

export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  const response = await axiosWithCredentials.delete(`${COURSES_API}/assignments/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignment: Assignment): Promise<Assignment> => {
  const response = await axiosWithCredentials.put(`${COURSES_API}/assignments/${assignment._id}`, assignment);
  return response.data;
};

export const enrollInCourse = async (userId: string, courseId: string): Promise<void> => {
  const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}/enroll`);
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string): Promise<void> => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}/unenroll`);
  return response.data;
};

export const findUsersforCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

export const findAssignmentById = async (assignmentId: string): Promise<Assignment> => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/assignments/${assignmentId}`);
  return response.data;
};
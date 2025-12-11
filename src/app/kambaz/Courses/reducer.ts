"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";
export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
  department: string;
  credits: number;
  author?: string;
}
interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: courses as Course[],
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: course }: PayloadAction<Omit<Course, '_id'>>) => {
      const newCourse: Course = { ...course, _id: uuidv4() } as Course;
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, { payload: courseId }: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (course) => course._id !== courseId
      );
    },
    updateCourse: (state, { payload: course }: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === course._id ? course : c
      );
    },
    setCourses: (state, { payload: courses }: PayloadAction<Course[]>) => {
      state.courses = courses;
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse, setCourses } = courseSlice.actions;
export default courseSlice.reducer;
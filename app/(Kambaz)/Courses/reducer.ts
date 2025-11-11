import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses as dbCourses } from "../Database";
import { v4 as uuidv4 } from "uuid";

// Define the Course type
export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
  createdBy?: string; // Track who created the course
}

// Define the state shape
interface CoursesState {
  courses: Course[];
}

// Initial state
const initialState: CoursesState = {
  courses: dbCourses as Course[],
};

// Create the slice
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, action: PayloadAction<Course>) => {
      const newCourse = { ...action.payload, _id: uuidv4() };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
  },
});

// Export actions and reducer
export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;
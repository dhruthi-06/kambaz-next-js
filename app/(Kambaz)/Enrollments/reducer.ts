"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    // Replace entire list (comes from server)
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },

    // Add only if not already enrolled
    addEnrollment: (state, action: PayloadAction<Enrollment>) => {
      const exists = state.enrollments.some(
        (e) =>
          e.user === action.payload.user &&
          e.course === action.payload.course
      );
      if (!exists) {
        state.enrollments.push(action.payload);
      }
    },

    // Remove by user + course
    removeEnrollment: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments = state.enrollments.filter(
        (e) =>
          !(e.user === action.payload.user && e.course === action.payload.course)
      );
    },
  },
});

export const { setEnrollments, addEnrollment, removeEnrollment } =
  enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;

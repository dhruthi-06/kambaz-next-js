"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Enrollment {
  user?: string;
  course?: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [], // Do NOT load from db
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<Enrollment>) => {
      const user = action.payload.user?.toString() ?? "";
      const course = action.payload.course?.toString() ?? "";

      // ignore invalid payloads
      if (!user || !course) return;

      const exists = state.enrollments.some(
        (e) => e.user === user && e.course === course
      );
      if (!exists) {
        state.enrollments.push({ user, course });
      }
    },
    unenroll: (state, action: PayloadAction<Enrollment>) => {
      const user = action.payload.user?.toString() ?? "";
      const course = action.payload.course?.toString() ?? "";

      if (!user || !course) return;

      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === user && e.course === course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
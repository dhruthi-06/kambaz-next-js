"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface Assignment {
  _id: string;
  name: string;
  course: string;
  modules?: string;
  description?: string;
  notavailableuntil?: string;
  due?: string;
  points?: number;
  completed?: boolean;
  editing?: boolean;   // ⭐ needed for editor
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, { payload }) => {
      state.assignments = payload;
    },

    addAssignment: (state, { payload }) => {
      state.assignments.push(payload);
    },

    updateAssignment: (state, { payload }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? payload : a
      );
    },

    deleteAssignment: (state, { payload }) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== payload
      );
    },

    // ⭐ THIS WAS MISSING
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
  editAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;

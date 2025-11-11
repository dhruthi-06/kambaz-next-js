"use client";

import { createSlice } from "@reduxjs/toolkit";
import { assignments as dbAssignments } from "../../../Database"; // ✅ adjust path if needed
import { v4 as uuidv4 } from "uuid";

// ✅ Define the Assignment interface
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
}

// ✅ Define the state type
interface AssignmentsState {
  assignments: Assignment[];
}

// ✅ Initialize with database data
const initialState: AssignmentsState = {
  assignments: dbAssignments as Assignment[],
};

// ✅ Create the slice
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // ➕ Add a new assignment
    addAssignment: (state, { payload }) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        name: payload.name || "New Assignment",
        course: payload.course,
        modules: payload.modules || "General",
        description: payload.description || "",
        notavailableuntil: payload.notavailableuntil || "2025-01-01",
        due: payload.due || "2025-01-10",
        points: Number(payload.points) || 100, // ✅ convert to number
        completed: false,
      };
      state.assignments.push(newAssignment);
    },

    // ✏️ Update an existing assignment
    updateAssignment: (state, { payload }) => {
      const index = state.assignments.findIndex((a) => a._id === payload._id);
      if (index !== -1) {
        state.assignments[index] = {
          ...state.assignments[index],
          ...payload,
          points: Number(payload.points), // ✅ ensure numeric
        };
      }
    },

    // ❌ Delete an assignment
    deleteAssignment: (state, { payload: id }) => {
      state.assignments = state.assignments.filter((a) => a._id !== id);
    },
  },
});

// ✅ Export actions and reducer
export const { addAssignment, updateAssignment, deleteAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;

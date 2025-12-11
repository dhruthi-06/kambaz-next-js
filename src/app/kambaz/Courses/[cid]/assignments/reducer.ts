import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Assignment } from "@/app/kambaz/Database";

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState: [] as Assignment[],
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      return action.payload;
    },
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.push(action.payload);
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      return state.filter((a) => a._id !== action.payload);
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      return state.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
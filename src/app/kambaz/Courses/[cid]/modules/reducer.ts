"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Lesson {
  _id: string;
  name: string;
  description?: string;
  module?: string;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean; 
}

interface ModulesState {
  modules: Module[];
  loading: boolean;
  error: string | null;
}

const initialState: ModulesState = {
  modules: [],
  loading: false,
  error: null,
};

const moduleSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModule: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
    addModule: (state, { payload: module }: PayloadAction<Module>) => {
      state.modules = [...state.modules, module];
    },
    deleteModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? {...m, ...module} : m
      );
    },
    editModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  addModule, 
  deleteModule, 
  updateModule, 
  editModule, 
  setModule,
  setLoading,
  setError 
} = moduleSlice.actions;

export default moduleSlice.reducer;
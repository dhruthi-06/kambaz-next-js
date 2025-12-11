import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Enrollment {
  _id?: string;
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
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      console.log("Setting enrollments from backend:", action.payload);
      state.enrollments = action.payload;
    },
    
    enrollInCourse: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      const { userId, courseId } = action.payload;
      console.log("Enrolling in Redux:", { userId, courseId });
      
      const exists = state.enrollments.some(
        (enrollment) => String(enrollment.user) === String(userId) && String(enrollment.course) === String(courseId)
      );
      
      if (!exists) {
        state.enrollments.push({
          _id: new Date().getTime().toString(),
          user: String(userId),
          course: String(courseId),
        });
        console.log("Enrollment added. Total enrollments:", state.enrollments.length);
      } else {
        console.log("Already enrolled in Redux state");
      }
    },
    
    unenrollFromCourse: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      const { userId, courseId } = action.payload;
      console.log("Unenrolling from Redux:", { userId, courseId });
      
      state.enrollments = state.enrollments.filter(
        (enrollment) => !(String(enrollment.user) === String(userId) && String(enrollment.course) === String(courseId))
      );
      
      console.log("Enrollment removed. Total enrollments:", state.enrollments.length);
    },
  },
});

export const { setEnrollments, enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
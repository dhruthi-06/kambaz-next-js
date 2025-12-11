import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";
import enrollments from "./enrollments.json";
import users from "./users.json";

export interface Assignment {
  _id?: string;
  title: string;
  course: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  assignmentGroup?: string;
  displayGradeAs?: string;
  submissionType?: string;
  textEntry?: boolean;
  websiteUrl?: boolean;
  mediaRecordings?: boolean;
  studentAnnotation?: boolean;
  fileUploads?: boolean;
}

const db = { courses, modules, assignments, enrollments, users };

export {courses, modules, assignments, enrollments, users};
export default db;
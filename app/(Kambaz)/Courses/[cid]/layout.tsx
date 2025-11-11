"use client";

import { ReactNode, useState, useEffect } from "react";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import * as db from "../../Database";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const { courses: reduxCourses } = useSelector((state: RootState) => state.courses);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  // Try to find course in Redux first, then fallback to database
  const course = reduxCourses.find((c) => c._id === cid) || 
                 (db.courses as any[]).find((c) => c._id === cid);
  const [showNav, setShowNav] = useState(true);

  // Check if user has access to this course
  // For now, allow access if course exists (route protection can be re-enabled later)
  useEffect(() => {
    // Only redirect if there's no course found
    if (!course) {
      router.push("/Dashboard");
      return;
    }
    
    // Optional: Re-enable this check if you want enrollment protection
    // if (!currentUser) {
    //   router.push("/Dashboard");
    //   return;
    // }
    // const isFaculty = currentUser.role?.toUpperCase() === "FACULTY";
    // const enrolledCourseIds = currentUser.enrolledCourses || [];
    // const isEnrolled = enrolledCourseIds.includes(cid as string);
    // if (!isFaculty && !isEnrolled) {
    //   router.push("/Dashboard");
    // }
  }, [cid, currentUser, router, course]);

  // If course doesn't exist, don't render
  if (!course) {
    return null;
  }

  return (
    <div id="wd-courses" className="container-fluid">
      {/* ✅ Pass toggle function to Breadcrumb */}
      <Breadcrumb course={course} onToggle={() => setShowNav(!showNav)} />
      <hr />

      <div className="d-flex">
        {/* ✅ Sidebar that can be hidden/shown */}
        {showNav && (
          <div
            className="border-end p-3 d-none d-md-block"
            style={{ width: "200px" }}
          >
            <CourseNavigation cid={cid as string} />
          </div>
        )}
        <div className="flex-fill p-3">{children}</div>
      </div>
    </div>
  );
}

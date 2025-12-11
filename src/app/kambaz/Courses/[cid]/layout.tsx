"use client";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import CourseNavigation from "./navigation";
import { FaAlignJustify } from "react-icons/fa6";
import BreadCrumb from "./BreadCrumb";

export default function CoursesLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { cid } = useParams();
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentReducer);
    const course = courses.find((course) => course._id === cid);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
    useEffect(() => {
        if (!currentUser) {
            router.push("/kambaz/Dashboard");
            return;
        }

        const isFaculty = currentUser.role === "FACULTY";
        const isEnrolled = enrollments.some(
            (enrollment) => enrollment.user === currentUser._id && enrollment.course === cid
        );

        if (!isFaculty && !isEnrolled) {
            router.push("/kambaz/Dashboard");
        }
    }, [currentUser, enrollments, cid, router]);

    return (
        <div id="wd-courses">
            <h2 className="text-danger" style={{ userSelect: "none" }}>
                <FaAlignJustify
                    style={{ cursor: "pointer" }}
                    className="me-4 fs-4 mb-1"
                    onClick={toggleSidebar}
                />
                <BreadCrumb course={course} />
            </h2>
            <div className="d-flex">
                {sidebarVisible && (
                    <div className="d-none d-md-block">
                        <CourseNavigation />
                    </div>
                )}
                <div className="flex-fill">{children}</div>
            </div>
        </div>
    );
}
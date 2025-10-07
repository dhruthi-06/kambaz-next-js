import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";

type LayoutPropsForCourse = {
  children: ReactNode;
  params: Promise<{ cid: string }>;
};

export default async function CoursesLayout({
  children,
  params,
}: LayoutPropsForCourse) {
  const { cid } = await params;

  return (
    <div id="wd-courses" className="container-fluid">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Course {cid}
      </h2>
      <hr />

      <div className="d-flex">
        <div
          className="d-none d-md-block border-end p-3"
          style={{ width: "200px" }}
        >
          <CourseNavigation />
        </div>

        <div className="flex-fill p-3">{children}</div>
      </div>
    </div>
  );
}
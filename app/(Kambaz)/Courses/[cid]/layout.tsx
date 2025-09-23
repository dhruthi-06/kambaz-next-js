import { ReactNode } from "react";
import CourseNavigation from "./Navigation";

type LayoutPropsForCourse = {
  children: ReactNode;
  params: { cid: string }; // match folder name
};

export default async function CoursesLayout({ children, params }: LayoutPropsForCourse) {
  const { cid } = params; // use 'cid' here
  return (
    <div id="wd-courses">
      <h2>Courses {cid}</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200">
              <CourseNavigation />
            </td>
            <td valign="top" width="100%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

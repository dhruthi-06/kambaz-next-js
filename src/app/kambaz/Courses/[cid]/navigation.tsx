"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CoursesNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  const isActive = (link: string) => {
    return pathname.includes(link);
  };

  // Map display name to actual route
  const getRoute = (link: string) => {
    // Keep Quizzes capitalized, lowercase everything else
    if (link === "Quizzes") {
      return "Quizzes";
    }
    return link.toLowerCase();
  };

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-6 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          href={`/kambaz/Courses/${cid}/${getRoute(link)}`}
          id={`wd-course-${link.toLowerCase()}`}
          className={`list-group-item border-0 ${
            isActive(link) ? "active" : "text-danger"
          }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}

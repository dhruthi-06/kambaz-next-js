"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";

type Props = { cid: string };

export default function CourseNavigation({ cid }: Props) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentSection = pathSegments[2]?.toLowerCase() || "home";

  const links = [
    { label: "Home", path: `/Courses/${cid}/Home` },
    { label: "Modules", path: `/Courses/${cid}/Modules` },
    { label: "Piazza", path: "https://piazza.com/class/mf9tt3f8vlw16f" },
    { label: "Zoom", path: "https://zoom.us/signin#/login" },
    { label: "Assignments", path: `/Courses/${cid}/Assignments` },
    { label: "Quizzes", path: "https://northeastern.instructure.com/courses/225988/quizzes" },
    { label: "Grades", path: "https://northeastern.instructure.com/courses/225988/grades" },
    { label: "People", path: `/Courses/${cid}/People/Table` },
  ];

  return (
    <ListGroup
      id="wd-courses-navigation"
      className="fs-5 rounded-0 wd list-group"
      style={{ minWidth: "170px" }}
    >
      {links.map((link) => {
        const isActive = currentSection === link.label.toLowerCase();

        return (
          <ListGroupItem
            key={link.label}
            as={Link}
            href={link.path}
            className={`border-0 py-2 px-3 position-relative text-danger ${
              isActive ? "text-black border-start border-3 border-black" : ""
            }`}
            style={{ borderRadius: 0, transition: "all 0.2s ease" }}
          >
            {link.label}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}

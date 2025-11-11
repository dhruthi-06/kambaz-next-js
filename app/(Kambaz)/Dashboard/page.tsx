"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { enroll, unenroll } from "../Enrollments/reducer";

import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { courses as initialCourses } from "../Database";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = "currentUser"; // Replace with actual logged-in user ID

  // Local state
  const [courses, setCourses] = useState<any[]>(initialCourses);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.webp",
    description: "New Description",
  });
  const [showAll, setShowAll] = useState(false); // Toggle between all / enrolled courses

  // Redux: enrollments
  const enrollments = useSelector(
    (state: RootState) => state.enrollmentsReducer.enrollments
  );

  // Persist enrollments in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("enrollments");
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.forEach((e: any) => dispatch(enroll(e)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("enrollments", JSON.stringify(enrollments));
  }, [enrollments]);

  // Helpers
  const isEnrolled = (courseId: string) =>
    enrollments.some((e) => e.user === userId && e.course === courseId);

  const displayedCourses = showAll
    ? courses
    : courses.filter((c) => isEnrolled(c._id));

  // Course handlers
  const addNewCourse = () => {
    const newCourse = { ...course, _id: uuidv4() };
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = () => {
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Enrollment Toggle */}
      <Button
        style={{ backgroundColor: "blue", color: "white", marginBottom: "1rem" }}
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show Only Enrolled" : "Show All Courses"}
      </Button>

      {/* New / Update Course */}
      <h5>
        New Course
        <Button
          className="float-end"
          variant="primary"
          onClick={addNewCourse}
        >
          Add
        </Button>
        <Button
          className="float-end me-2"
          variant="warning"
          onClick={updateCourse}
        >
          Update
        </Button>
      </h5>

      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
        placeholder="Course Name"
      />
      <FormControl
        value={course.description}
        className="mb-2"
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
        as="textarea"
        placeholder="Course Description"
      />
      <hr />

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />

      {/* Courses Grid */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {displayedCourses.map((c) => (
          <Col key={c._id} className="d-flex justify-content-center">
            <Card className="h-100" style={{ width: "100%" }}>
              <Card.Img
                src={c.image || "/images/reactjs.jpg"}
                alt={c.name}
                style={{ objectFit: "cover", height: "160px" }}
              />
              <Card.Body>
                <Card.Title className="text-truncate" title={c.name}>
                  {c.name}
                </Card.Title>
                <Card.Text style={{ height: "80px", overflow: "hidden" }}>
                  {c.description}
                </Card.Text>

                <div className="d-flex justify-content-between">
                  {/* Navigate only if enrolled */}
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (isEnrolled(c._id)) {
                        router.push(`/Courses/${c._id}/Home`);
                      } else {
                        alert("You are not enrolled in this course!");
                      }
                    }}
                  >
                    Go
                  </Button>

                  <div>
                    {/* Enroll / Unenroll */}
                    {isEnrolled(c._id) ? (
                      <Button
                        variant="danger"
                        size="sm"
                        className="me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(unenroll({ user: userId, course: c._id }));
                        }}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(enroll({ user: userId, course: c._id }));
                        }}
                      >
                        Enroll
                      </Button>
                    )}

                    {/* Edit / Delete */}
                    <Button
                      id="wd-edit-course-click"
                      variant="warning"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCourse(c);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      id="wd-delete-course-click"
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteCourse(c._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

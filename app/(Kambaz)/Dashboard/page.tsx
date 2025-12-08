"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setCourses } from "../Courses/reducer";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../Account/reducer";
import * as client from "../Courses/client";

import { Row, Col, Card, Button, FormControl } from "react-bootstrap";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { courses } = useSelector((state: RootState) => state.courses);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const [course, setCourse] = useState<any>({
    name: "",
    description: "",
    image: "/images/reactjs.webp",
  });

  const [showAll, setShowAll] = useState(false);

  // LOAD COURSES
  const fetchCourses = async () => {
    if (!currentUser) return;
    try {
      const list = showAll
        ? await client.fetchAllCourses()
        : await client.findMyCourses();

      dispatch(setCourses(list.filter((c: any) => c))); // remove nulls
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (currentUser) fetchCourses();
  }, [currentUser, showAll]);

  // CREATE COURSE
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
    setCourse({ name: "", description: "", image: "/images/reactjs.webp" });
  };

  // DELETE COURSE
  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c && c._id !== courseId)));
  };

  // UPDATE COURSE
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => (c && c._id === course._id ? course : c))
      )
    );
  };

  // ENROLL / UNENROLL
  const handleEnroll = async (courseId: string) => {
    await client.enrollIntoCourse(currentUser._id, courseId);
    fetchCourses();
  };

  const handleUnenroll = async (courseId: string) => {
    await client.unenrollFromCourse(currentUser._id, courseId);
    fetchCourses();
  };

  const isEnrolled = (courseId: string) => {
    return currentUser?.enrolledCourses?.includes(courseId) ?? false;
  };

useEffect(() => {
  if (!currentUser) {
    router.replace("/Account/Signin");
  }
}, [currentUser, router]);

if (!currentUser) {
  return null;  // stop rendering while redirect happens
}


  return (
    <div className="p-4" id="wd-dashboard">
      <h1>Dashboard</h1>
      <hr />

      {/* CREATE COURSE - faculty only */}
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <Button
              className="float-end"
              variant="primary"
              onClick={onAddNewCourse}
            >
              Add
            </Button>

            <Button
              className="float-end me-2"
              variant="warning"
              onClick={onUpdateCourse}
            >
              Update
            </Button>
          </h5>

          <FormControl
            className="mb-2"
            placeholder="Course Name"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            className="mb-2"
            as="textarea"
            rows={3}
            placeholder="Course Description"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      {/* TOGGLE BUTTON */}
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show My Courses" : "Show All Courses"}
      </Button>

      <h3>Courses ({courses.filter((c) => c).length})</h3>
      <hr />

      {/* COURSES GRID */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {courses.filter((c) => c).map((c: any) => (
          <Col key={c._id}>
            <Card>
              <Card.Img
                src={c?.image && c.image !== "" ? c.image : "/images/reactjs.jpg"}
                height="160"
                style={{ objectFit: "cover" }}
              />

              <Card.Body>
                <Card.Title>{c?.name || "Untitled Course"}</Card.Title>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => router.push(`/Courses/${c._id}/Home`)}
                  >
                    Go
                  </Button>

                  {currentUser.role === "FACULTY" && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDeleteCourse(c._id)}
                    >
                      Delete
                    </Button>
                  )}

                  {currentUser.role === "FACULTY" && (
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => setCourse(c)}
                    >
                      Edit
                    </Button>
                  )}
                </div>

                {currentUser.role !== "FACULTY" && (
                  <div className="d-flex justify-content-end mt-2">
                    {isEnrolled(c._id) ? (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleUnenroll(c._id)}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleEnroll(c._id)}
                      >
                        Enroll
                      </Button>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

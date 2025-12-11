"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses, Course } from "../Courses/reducer";
import { setEnrollments, enrollInCourse, unenrollFromCourse } from "../enrollmentReducer";
import { RootState } from "../store";
import * as client from "../Courses/client";
import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";

interface Enrollment {
  user: string;
  course: string;
}

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentReducer) as { enrollments: Enrollment[] };
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const courseNameInputRef = useRef<HTMLInputElement>(null);

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/react.png",
    description: "New Description",
    department: "New Department",
    credits: 3,
  });

  const fetchCourses = useCallback(async () => {
    try {
      const courses = await client.fetchAllCourses();
      console.log("Courses loaded:", courses);
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const fetchEnrollments = useCallback(async () => {
  if (!currentUser) {
    console.log("No user, skipping enrollment fetch");
    return;
  }
  
  const userId = currentUser._id || currentUser.username || currentUser.loginId;
  if (!userId) {
    console.log("No user ID, skipping enrollment fetch");
    return;
  }
    
    try {
    console.log("Fetching enrollments for user:", userId);
    const userEnrollments = await client.fetchUserEnrollments(userId);
    console.log("Enrollments fetched from backend:", userEnrollments);
    dispatch(setEnrollments(userEnrollments));
  } catch (error) {
    console.error("Failed to fetch enrollments:", error);
    dispatch(setEnrollments([]));
  }
}, [currentUser, dispatch]);

  useEffect(() => {
    if (currentUser) {
      console.log("Current user loaded, fetching data...");
      fetchCourses();
      fetchEnrollments(); 
    }
  }, [currentUser, fetchCourses, fetchEnrollments]);

  const onAddNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/react.png",
        description: "New Description",
        department: "New Department",
        credits: 3,
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Failed to create course");
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Failed to delete course");
    }
  };

  const onUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      dispatch(setCourses(courses.map((c) => (c._id === course._id ? course : c))));
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Failed to update course");
    }
  };

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const getUserId = () => {
    if (!currentUser) return null;
    return currentUser._id || currentUser.username || currentUser.loginId;
  };

  const isEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    
    const userId = getUserId();
    const enrolled = enrollments.some((enrollment) => {
      const userMatch = String(enrollment.user) === String(userId);
      const courseMatch = String(enrollment.course) === String(courseId);
      return userMatch && courseMatch;
    });
    
    return enrolled;
  };

  const handleEnroll = async (courseId: string) => {
  const userId = getUserId();
  console.log("=== ENROLL DEBUG ===");
  console.log("Attempting to enroll:", { userId, courseId });
  console.log("Current enrollments:", enrollments);
  
  if (currentUser && userId) {
    try {
      console.log("Calling backend API...");
      await client.enrollInCourse(userId, courseId);
      console.log("Backend enrollment successful!");
      dispatch(enrollInCourse({ userId, courseId }));
      await fetchEnrollments();
      
      console.log("Enrollment complete! Updated enrollments:", enrollments);
      console.log("✅ Successfully enrolled in", courseId);
      
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("=== ENROLLMENT ERROR ===");
      console.error("Full error object:", error);
      console.error("Error response:", err.response);
      alert(err.response?.data?.message || "Failed to enroll");
    }
  }
};

  const handleUnenroll = async (courseId: string) => {
    const userId = getUserId();
    if (currentUser && userId) {
      try {
        await client.unenrollFromCourse(userId, courseId);
        dispatch(unenrollFromCourse({ userId, courseId }));
        await fetchEnrollments();
        alert("Successfully unenrolled!");
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        alert(err.response?.data?.message || "Failed to unenroll");
      }
    }
  };

  const handleEditCourse = (courseItem: Course) => {
    setCourse(courseItem);
    setTimeout(() => {
      courseNameInputRef.current?.focus();
      courseNameInputRef.current?.select();
    }, 0);
  };

  const coursesToDisplay = showAllCourses
    ? courses
    : courses.filter((course) => isEnrolled(course._id) || isFaculty);

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Courses" : "Enrollments"}
        </Button>
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5 className="mb-0">
            New Course
            <button
              className="btn btn-primary float-end ms-2"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2 ms-2"
              id="wd-edit-course-click"
              onClick={onUpdateCourse}
            >
              Update
            </button>
          </h5>
          <FormControl
            ref={courseNameInputRef}
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course Name"
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            placeholder="Course Description"
          />
          <hr />
        </>
      )}

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {currentUser &&
            coursesToDisplay.map((courseItem) => {
              const enrolled = isEnrolled(courseItem._id);
              return (
                <Col key={courseItem._id} className="wd-dashboard-course-1" style={{ width: 300 }}>
                  <Card>
                    <div style={{ position: 'relative', width: '100%', height: '160px' }}>
                      <Image 
                        src="/images/react.png"
                        alt={courseItem.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="300px"
                      />
                    </div>
                    
                    <CardBody>
                      <Link
                        href={`/kambaz/Courses/${courseItem._id}/home`}
                        className="text-decoration-none text-dark"
                        onClick={(e) => {
                          if (!enrolled && !isFaculty) {
                            e.preventDefault();
                            alert("Please enroll in this course to access it");
                          }
                        }}
                      >
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {courseItem.name}
                        </CardTitle>

                        <CardText
                          className="wd-dashboard-course-description overflow-hidden"
                          style={{ height: "100px" }}
                        >
                          {courseItem.description}
                        </CardText>

                        {(enrolled || isFaculty) && <Button variant="primary">Go</Button>}
                      </Link>

                      {isFaculty && (
                        <>
                          <Button
                            className="btn btn-danger float-end me-2"
                            onClick={(event) => {
                              event.preventDefault();
                              if (confirm(`Are you sure you want to delete "${courseItem.name}"?`)) {
                                onDeleteCourse(courseItem._id);
                              }
                            }}
                          >
                            Delete
                          </Button>

                          <Button
                            className="btn btn-warning me-2 float-end"
                            onClick={(event) => {
                              event.preventDefault();
                              handleEditCourse(courseItem);
                            }}
                          >
                            Edit
                          </Button>
                        </>
                      )}

                      {!isFaculty && (
                        <>
                          {enrolled ? (
                            <Button
                              variant="danger"
                              className="float-end"
                              onClick={(event) => {
                                event.preventDefault();
                                handleUnenroll(courseItem._id);
                              }}
                            >
                              Unenroll
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              className="float-end"
                              onClick={(event) => {
                                event.preventDefault();
                                handleEnroll(courseItem._id);
                              }}
                            >
                              Enroll
                            </Button>
                          )}
                        </>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
}
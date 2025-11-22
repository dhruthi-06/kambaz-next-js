"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setCourses } from "../Courses/reducer";
import { useRouter } from "next/navigation";
import * as client from "../Courses/client";


import { Row, Col, Card, Button, FormControl } from "react-bootstrap";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { courses } = useSelector((state: RootState) => state.courses);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [course, setCourse] = useState<any>({
    name: "",
    description: "",
    image: "/images/reactjs.webp",
  });

  const [showAll, setShowAll] = useState(true);


  const fetchCourses = async () => {
    if (!currentUser) return;
    try {
      const list = await client.findMyCourses();
      dispatch(setCourses(list));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));

  
    setCourse({ name: "", description: "", image: "/images/reactjs.webp" });
  };


  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

 
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => (c._id === course._id ? course : c))
      )
    );
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <h1>Dashboard</h1>
      <hr />

      {/* NEW COURSE FORM */}
      <h5>
        New Course
        <Button className="float-end" variant="primary" onClick={onAddNewCourse}>
          Add
        </Button>

        <Button className="float-end me-2" variant="warning" onClick={onUpdateCourse}>
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
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />

      <hr />

      {/* TOGGLE */}
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show Only Enrolled" : "Show All"}
      </Button>

      <h3>Courses ({courses.length})</h3>
      <hr />

      {/* COURSES GRID */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {courses.map((c) => (
          <Col key={c._id}>
            <Card>
              <Card.Img
                src={c.image || "/images/reactjs.jpg"}
                height="160"
                style={{ objectFit: "cover" }}
              />

              <Card.Body>
                <Card.Title>{c.name}</Card.Title>

                <div className="d-flex justify-content-between">

                  
                  <Button
                    variant="primary"
                    onClick={() => router.push(`/Courses/${c._id}/Home`)}
                  >
                    Go
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDeleteCourse(c._id)}
                  >
                    Delete
                  </Button>

                
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => setCourse(c)}
                  >
                    Edit
                  </Button>

                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

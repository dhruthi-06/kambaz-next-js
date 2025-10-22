"use client";

import Link from "next/link";
import { Row, Col, Card, Button, CardImg, CardBody, CardTitle, CardText } from "react-bootstrap";
import { courses } from "../Database";

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {courses.map((course, index) => (
          <Col
            key={`${course._id}-${index}`} 
            className="d-flex justify-content-center"
          >
            <Link
              href={`/Courses/${course._id}/Home`}
              className="text-decoration-none"
              style={{ width: "100%" }}
            >
              <Card className="h-100">
                <Card.Img
                  src={course.image || "/images/default.jpg"}
                  alt={course.name}
                  style={{ objectFit: "cover", height: "160px" }}
                />
                <Card.Body>
                  <Card.Title
                    className="text-truncate"
                    title={course.name}
                  >
                    {course.name}
                  </Card.Title>
                  <Card.Text
                    style={{
                      height: "100px",
                      overflow: "hidden",
                    }}
                  >
                    {course.description}
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

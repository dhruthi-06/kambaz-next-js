"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

const courses = [
  { id: "1234", title: "CS1234 React JS", description: "Full Stack software developer", img: "/images/reactjs.webp" },
  { id: "2345", title: "CS2345 Node JS", description: "Backend development", img: "/images/nodejs.png" },
  { id: "3456", title: "CS3456 Python", description: "Data Science fundamentals", img: "/images/python.png" },
  { id: "4567", title: "CS4567 Java", description: "Enterprise application development", img: "/images/java.png" },
  { id: "5678", title: "CS5678 CSharp", description: "Competitive programming", img: "/images/csharp.png" },
  { id: "6789", title: "CS6789 Cybersecurity", description: "Security essentials", img: "/images/download.jpeg" },
  { id: "7890", title: "CS7890 SQL", description: "Database management", img: "/images/sql.png" },
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {courses.map((course) => (
          <Col key={course.id} className="d-flex justify-content-center">
            <Card style={{ width: "300px" }}>
              <Link href={`/Courses/${course.id}/Home`} className="text-decoration-none text-dark">
                <div style={{ position: "relative", width: "100%", height: "160px" }}>
                  <Image
                    src={course.img}
                    alt={course.title}
                    fill
                    style={{
                      objectFit: "cover",
                      borderTopLeftRadius: "0.25rem",
                      borderTopRightRadius: "0.25rem",
                    }}
                  />
                </div>
                <CardBody>
                  <CardTitle className="text-truncate">{course.title}</CardTitle>
                  <CardText style={{ height: "60px", overflow: "hidden" }}>
                    {course.description}
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

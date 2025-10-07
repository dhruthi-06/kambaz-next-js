"use client";
import Link from "next/link";
import { Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div
      id="wd-profile-screen"
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <div
        className="border rounded p-4 shadow-sm bg-white"
        style={{ width: "400px" }}
      >
        <h3 className="text-center text-black mb-4">Profile</h3>

        <Form>
          {/* Username */}
          <Form.Group className="mb-3" controlId="wd-username">
            <Form.Control
              type="text"
              placeholder="Username"
              defaultValue="alice"
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="wd-password">
            <Form.Control
              type="password"
              placeholder="Password"
              defaultValue="123"
            />
          </Form.Group>

          {/* First Name */}
          <Form.Group className="mb-3" controlId="wd-firstname">
            <Form.Control
              type="text"
              placeholder="First Name"
              defaultValue="Alice"
            />
          </Form.Group>

          {/* Last Name */}
          <Form.Group className="mb-3" controlId="wd-lastname">
            <Form.Control
              type="text"
              placeholder="Last Name"
              defaultValue="Wonderland"
            />
          </Form.Group>

          {/* Date of Birth */}
          <Form.Group className="mb-3" controlId="wd-dob">
            <Form.Control type="date" defaultValue="2000-01-01" />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="wd-email">
            <Form.Control
              type="email"
              placeholder="Email"
              defaultValue="alice@wonderland"
            />
          </Form.Group>

          {/* Role */}
          <Form.Group className="mb-3" controlId="wd-role">
            <Form.Select defaultValue="FACULTY">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
          </Form.Group>

          {/* Sign out */}
          <Link
            href="/Account/Signin"
            id="wd-signout-link"
            className="btn btn-danger w-100 mt-2"
          >
            Sign out
          </Link>
        </Form>
      </div>
    </div>
  );
}
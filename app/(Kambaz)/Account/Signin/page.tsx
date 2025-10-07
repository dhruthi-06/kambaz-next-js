"use client";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";

export default function Signin() {
  return (
    <div
      id="wd-signin-screen"
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <div
        className="border rounded p-4 shadow-sm bg-white"
        style={{ width: "350px" }}
      >
        <h3 className="text-center text-black mb-4">Sign In</h3>

        <Form>
          {/* Username */}
          <Form.Group className="mb-3" controlId="wd-username">
            <Form.Control
              type="text"
              placeholder="Username"
              defaultValue="johndoe"
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="wd-password">
            <Form.Control
              type="password"
              placeholder="Password"
              defaultValue="password123"
            />
          </Form.Group>

          {/* Sign in button */}
          <Link
            href="/Account/Profile"
            id="wd-signin-btn"
            className="btn btn-primary w-100 mb-3"
          >
            Sign in
          </Link>

          {/* Sign up link */}
          <div className="text-center">
            <Link href="/Account/Signup" id="wd-signup-link">
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
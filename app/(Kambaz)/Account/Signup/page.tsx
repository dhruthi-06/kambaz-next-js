"use client";
import Link from "next/link";
import { Form } from "react-bootstrap";

export default function Signup() {
  return (
    <div
      id="wd-signup-screen"
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <div
        className="border rounded p-4 shadow-sm bg-white"
        style={{ width: "350px" }}
      >
        <h3 className="text-center text-black mb-4">Sign Up</h3>

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

          {/* Verify Password */}
          <Form.Group className="mb-3" controlId="wd-password-verify">
            <Form.Control
              type="password"
              placeholder="Verify Password"
              defaultValue="password123"
            />
          </Form.Group>

          {/* Sign up button */}
          <Link
            href="/Account/Profile"
            id="wd-signup-btn"
            className="btn btn-primary w-100 mb-3"
          >
            Sign up
          </Link>

          {/* Sign in link */}
          <div className="text-center">
            <Link href="/Account/Signin" id="wd-signin-link">
              Already have an account? Sign in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
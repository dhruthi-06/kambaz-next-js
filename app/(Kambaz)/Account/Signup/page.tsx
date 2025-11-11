"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import * as db from "../../Database";
import { setCurrentUser } from "../reducer";
import type { User } from "../reducer";

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verifyPassword: "",
  });

  const handleSignup = () => {
    // Validate passwords match
    if (formData.password !== formData.verifyPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Validate required fields
    if (!formData.username || !formData.password) {
      alert("Please fill in all required fields!");
      return;
    }

    // Check if username already exists
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const dbUsers = db.users as unknown as User[];
    const allUsers = [...dbUsers, ...existingUsers];
    
    if (allUsers.some(u => u.username === formData.username)) {
      alert("Username already exists! Please choose a different username.");
      return;
    }

    // Create new user with default values
    const newUser: User = {
      _id: uuidv4(),
      username: formData.username,
      password: formData.password,
      firstName: "", // Can be filled in Profile later
      lastName: "", // Can be filled in Profile later
      email: undefined,
      dob: undefined,
      role: "STUDENT", // Default role
      enrolledCourses: [],
    };

    // Save user to localStorage
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Set user in Redux store
    dispatch(setCurrentUser(newUser));
    
    // Redirect to Profile page
    router.push("/Account/Profile");
  };

  return (
    <div
      id="wd-signup-screen"
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <div
        className="border rounded p-4 shadow-sm bg-white"
        style={{ width: "400px" }}
      >
        <h3 className="text-center text-black mb-4">Sign Up</h3>

        <Form>
          {/* Username */}
          <Form.Group className="mb-3" controlId="wd-username">
            <Form.Control
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="wd-password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Group>

          {/* Verify Password */}
          <Form.Group className="mb-3" controlId="wd-password-verify">
            <Form.Control
              type="password"
              placeholder="Verify Password"
              value={formData.verifyPassword}
              onChange={(e) =>
                setFormData({ ...formData, verifyPassword: e.target.value })
              }
            />
          </Form.Group>

          {/* Sign up button */}
          <Button
            id="wd-signup-btn"
            variant="primary"
            className="w-100 mb-3"
            onClick={handleSignup}
          >
            Sign up
          </Button>

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

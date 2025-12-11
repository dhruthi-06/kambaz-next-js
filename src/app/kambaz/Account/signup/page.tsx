"use client";
import Link from "next/link";
import type { User } from "../client";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, FormSelect, Button } from "react-bootstrap";
import * as client from "../client";
import axios from "axios";

export default function Signup() {
   const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  
  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/kambaz/Dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Signup error:", error.response?.data);
        setError(error.response?.data?.message || "Signup failed. Please try again.");
      } else {
        console.error("Unknown signup error:", error);
        setError("Signup failed. Please try again.");
      }
    }
  };

  
  return (
    <div className="wd-signup-screen" style={{ width: "300px" }}>
      <h1>Sign up</h1>
      
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}
      
      <FormControl 
        value={user.username || ""} 
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username mb-2" 
        placeholder="username" 
      />
      <FormControl 
        value={user.password || ""} 
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2" 
        placeholder="password" 
        type="password"
      />
      <FormControl 
        value={user.firstName || ""} 
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        className="mb-2" 
        placeholder="First Name" 
      />
      <FormControl 
        value={user.lastName || ""} 
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        className="mb-2" 
        placeholder="Last Name" 
      />
      <FormControl 
        value={user.email || ""} 
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="mb-2" 
        placeholder="Email" 
        type="email"
      />
      <FormControl 
        value={user.dob || ""} 
        onChange={(e) => setUser({ ...user, dob: e.target.value })}
        className="mb-2" 
        type="date"
      />
      <FormSelect 
        value={user.role || "STUDENT"} 
        onChange={(e) => setUser({ ...user, role: e.target.value as User["role"] })}
        className="mb-2"
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Admin</option>
        <option value="TA">TA</option>
      </FormSelect>
      
      <Button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100">
        Sign up
      </Button>
      
      <Link href="/kambaz/Account/signin" className="wd-signin-link">
        Already have an account? Sign in
      </Link>
    </div>
  );
}
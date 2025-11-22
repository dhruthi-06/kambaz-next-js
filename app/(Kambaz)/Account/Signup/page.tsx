"use client";

import Link from "next/link";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    setError(null);
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));

      // ⭐ REDIRECT FIXED
      router.push("/Account/Profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div
      id="wd-signup-screen"
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <div className="border rounded p-4 shadow-sm bg-white" style={{ width: "400px" }}>
        <h3 className="text-center text-black mb-4">Sign Up</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <FormControl
          className="mb-3"
          placeholder="Username"
          value={user.username || ""}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <FormControl
          type="password"
          className="mb-3"
          placeholder="Password"
          value={user.password || ""}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <Button className="w-100 mb-3" variant="primary" onClick={signup}>
          Sign up
        </Button>

        <div className="text-center">
          <Link href="/Account/Signin">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
}

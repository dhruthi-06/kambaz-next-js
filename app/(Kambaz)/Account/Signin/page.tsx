"use client";

import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);

      if (!user) {
        alert("Invalid username or password");
        return;
      }

      dispatch(setCurrentUser(user));

      // ✅ LAB REQUIREMENT — GO TO PROFILE AFTER SIGNIN
      router.push("/Dashboard");

    } catch (err) {
      alert("Unable to sign in. Check your server and credentials.");
      console.error(err);
    }
  };

  return (
    <div id="wd-signin-screen" className="p-4">
      <h3 className="mb-3">Sign In</h3>

      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-3"
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <Button
        id="wd-signin-btn"
        className="w-100 mb-3"
        variant="primary"
        onClick={signin}
      >
        Sign In
      </Button>

      <div>
        <Link id="wd-signup-link" href="/Account/Signup">
          Signup
        </Link>
      </div>
    </div>
  );
}

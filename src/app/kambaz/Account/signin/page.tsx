"use client";
import * as client from "../client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import type { AxiosError } from "axios";

interface Credentials {
    username: string;
    password: string;
}

export default function SignIn() {
    const [credentials, setCredentials] = useState<Credentials>({username: "", password: ""});
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();

    const isAxiosError = (err: unknown): err is AxiosError<{ message: string }> =>
        typeof err === "object" &&
        err !== null &&
        "isAxiosError" in err;

    const signin = async () => {
        try {
            const user = await client.signin(credentials);

            if (!user) return;

            dispatch(setCurrentUser(user));
            router.push("/kambaz/Dashboard");
        } catch (err: unknown) {
            let message = "Login failed. Please try again.";

            if (isAxiosError(err)) {
                message = err.response?.data?.message ?? message;
            }

            setError(message);
        }
    };

    return (
        <div id="wd-signin-screen">
            <h1>Sign In</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <FormControl
                id="wd-username"
                type="text"
                placeholder="username"
                className="mb-2"
                value={credentials.username ?? ""}
                onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                }
            />
            <FormControl
                id="wd-password"
                type="password"
                placeholder="password"
                className="mb-2"
                value={credentials.password ?? ""}
                onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                }
            />
            <Button
                onClick={signin}
                id="wd-signin-btn"
                className="btn btn-primary w-100 mb-2"
            >
                Sign In
            </Button>

            New User?{" "}
            <Link id="wd-signup-link" href="/kambaz/Account/signup">
                Sign Up
            </Link>
        </div>
    );
}

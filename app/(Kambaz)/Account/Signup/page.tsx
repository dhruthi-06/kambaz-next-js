import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input
        placeholder="username"
        className="wd-username"
        defaultValue="alice123"
      />
      <br />
      <input
        placeholder="password"
        type="password"
        className="wd-password"
        defaultValue="password123"
      />
      <br />
      <input
        placeholder="verify password"
        type="password"
        className="wd-password-verify"
        defaultValue="password123"
      />
      <br />
      <Link href="Profile" id="wd-signup-submit">
        Sign up
      </Link>
      <br />
      <Link href="Signin" id="wd-signup-signin-link">
        Sign in
      </Link>
    </div>
  );
}

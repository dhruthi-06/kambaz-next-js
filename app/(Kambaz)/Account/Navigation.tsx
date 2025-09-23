import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <h2>Account</h2>
      <ul>
        <li>
          <Link href="/Account/Profile" id="wd-account-profile-link">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/Account/Signin" id="wd-account-profile-link">
            Sign In
          </Link>
        </li>
        <li>
          <Link href="/Account/Signup" id="wd-account-profile-link">
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
}

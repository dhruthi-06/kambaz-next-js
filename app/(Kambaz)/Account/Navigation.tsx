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
          <Link href="/Account/Settings" id="wd-account-settings-link">
            Settings
          </Link>
        </li>
        <li>
          <Link href="/Account/Signout" id="wd-account-signout-link">
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
}

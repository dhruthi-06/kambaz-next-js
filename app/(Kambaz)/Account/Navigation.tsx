"use client";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { RootState } from "../store";  

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isActive = (path: string) =>
    pathname === path ? "active border-0" : "text-danger border-0";

  return (
    <ListGroup
      id="wd-account-navigation"
      className="fs-5 rounded-0 list-group"
      style={{ minWidth: "170px" }}
    >
      {/* SIGNIN */}
      {!currentUser && (
        <ListGroupItem
          as={Link}
          href="/Account/Signin"
          id="wd-account-signin-link"
          className={isActive("/Account/Signin")}
        >
          Signin
        </ListGroupItem>
      )}

      {/* SIGNUP */}
      {!currentUser && (
        <ListGroupItem
          as={Link}
          href="/Account/Signup"
          id="wd-account-signup-link"
          className={isActive("/Account/Signup")}
        >
          Signup
        </ListGroupItem>
      )}

      {/* PROFILE */}
      {currentUser && (
        <ListGroupItem
          as={Link}
          href="/Account/Profile"
          id="wd-account-profile-link"
          className={isActive("/Account/Profile")}
        >
          Profile
        </ListGroupItem>
      )}

      {currentUser && currentUser.role === "ADMIN" && (
        <ListGroupItem
          as={Link}
          href="/Account/Users"
          id="wd-account-users-link"
          className={isActive("/Account/Users")}
        >
          Users
        </ListGroupItem>
      )}
    </ListGroup>
  );
}

"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function AccountNavigation() {
  return (
    <ListGroup
      id="wd-account-navigation"
      className="fs-5 rounded-0 list-group"
      style={{ minWidth: "170px" }}
    >
      <ListGroupItem
        as={Link}
        href="/Account/Signin"
        id="wd-account-signin-link"
        className="active border-0"
      >
        Signin
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/Account/Signup"
        id="wd-account-signup-link"
        className="text-danger border-0"
      >
        Signup
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/Account/Profile"
        id="wd-account-profile-link"
        className="text-danger border-0"
      >
        Profile
      </ListGroupItem>
    </ListGroup>
  );
}
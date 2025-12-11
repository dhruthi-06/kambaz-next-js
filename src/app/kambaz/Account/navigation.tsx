"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Accountnavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const pathname = usePathname();

  // Base links for all logged-in users
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <Nav variant="pills">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/kambaz/Account/${link.toLowerCase()}`}
            active={pathname.endsWith(link.toLowerCase())}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}
      
      {currentUser && (currentUser.role === "ADMIN" || currentUser.role === "FACULTY") && (
        <NavItem>
          <NavLink
            as={Link}
            href="/kambaz/Account/users"
            active={pathname.endsWith("users")}
          >
            Users
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
}
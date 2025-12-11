"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function Home() {
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink
          href="/Labs"
          as={Link}
          className={`nav-link ${pathname.endsWith("Labs") ? "active" : " "}`}
        >
          Labs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/Labs/lab1"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab1") ? "active" : " "}`}
        >
          Lab1
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/Labs/lab2"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab2") ? "active" : " "}`}
        >
          Lab2
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/Labs/lab3"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab3") ? "active" : " "}`}
        >
          Lab3
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/Labs/lab4"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab4") ? "active" : " "}`}
        >
          Lab4
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/Labs/lab5"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab5") ? "active" : " "}`}
        >
          Lab5
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/" as={Link}>
          Kambaz
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/" as={Link}>
          My GitHub
        </NavLink>
      </NavItem>
    </Nav>
  );
}

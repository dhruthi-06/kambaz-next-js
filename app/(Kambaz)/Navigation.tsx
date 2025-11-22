"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function KambazNavigation() {
  const pathname = usePathname();

 
  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Kambaz/Courses", icon: LiaBookSolid },
    {
      label: "Calendar",
      path: "https://northeastern.instructure.com/calendar#view_name=month",
      icon: IoCalendarOutline,
      external: true,
    },
    {
      label: "Inbox",
      path: "https://northeastern.instructure.com/conversations",
      icon: FaInbox,
      external: true,
    },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      
      <ListGroupItem
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        action
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" />
      </ListGroupItem>

   
      <ListGroupItem
        as={Link}
        href="/Account/Profile"
        className={`text-center border-0 ${
          isActive("/Account") ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            isActive("/Account") ? "text-danger" : "text-white"
          }`}
        />
        <br />
        Account
      </ListGroupItem>

     
      {links.map((link) => (
        <ListGroupItem
          key={link.label}
          as={link.external ? "a" : Link}
          href={link.path}
          target={link.external ? "_blank" : undefined}
          className={`text-center border-0 ${
            !link.external && isActive(link.path)
              ? "bg-white text-danger"
              : "bg-black text-white"
          }`}
        >
          {link.icon({
            className:
              isActive(link.path) && !link.external
                ? "fs-1 text-danger"
                : "fs-1 text-white",
          })}
          <br />
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

"use client";
import { MdAccountCircle } from "react-icons/md";
import { TfiDashboard } from "react-icons/tfi";
import { FaBook } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineInbox } from "react-icons/hi";
import { ImLab } from "react-icons/im";
import { ListGroupItem, ListGroup } from "react-bootstrap";
import { usePathname, useParams } from "next/navigation";
import courses from "./Database/courses.json";
import Image from "next/image";
import "./index.css";
import Link from "next/link";
export default function Kambaznavigation() {
    const pathname = usePathname();
    const params = useParams();
    const currentCourseId = (params.courseId as string) || courses[0]._id;
    const links = [
        {label: "Dashboard", path:"/kambaz/Dashboard", icon: TfiDashboard},
        {label: "Courses", path:`/kambaz/Courses/${currentCourseId}/home`, icon: FaBook},
        {label: "Calendar", path:"/kambaz/Calendar", icon: FaCalendarAlt},
        {label: "Inbox", path:"/kambaz/Inbox", icon: HiOutlineInbox},
        {label: "Labs", path:"/Labs", icon: ImLab},
    ]
    return (
            <ListGroup id="wd-kambaz-navigation" style={{width: 110}}
                className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
            <ListGroupItem id="wd-neu-link" target="_blank" href="https://www.northeastern.edu/"
                action className="bg-black border-0 text-center">
                <Image src="/images/neu.png" width={75} height={75} alt="logo"/></ListGroupItem>
            <ListGroupItem as={Link} href="/kambaz/Account/profile" className={`text-center border-0 bg-black ${pathname.includes("Account")?"bg-white      text-danger":"bg-black text-white"}`}>
                <MdAccountCircle className={`fs-3 ${pathname.includes("Account")?"text-danger":"text-white"}`}/> <br/>
                Account
            </ListGroupItem>
            {links.map((link) => (
            <ListGroupItem key={link.path} as={Link} href={link.path}
                className={`bg-black text-center border-0 ${pathname.includes(link.label)?"text-danger bg-white":"text-white bg-black"}`}>
                    {link.icon({className:"fs-3 text-danger"})}
                    <br/>
                    {link.label}
            </ListGroupItem>
        ))}
        </ListGroup>
    );
}

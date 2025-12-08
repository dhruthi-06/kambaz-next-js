
import Link from "next/link";
import TOC from "./TOC"; 

export default function LabsPage() {
  return (
    <div id="wd-labs-page">
      <h1>Labs</h1>

     
      <p id="wd-name">Dhruthi Rajesh</p>
      <p id="wd-name">Offline Batch</p>
      <p id="wd-name">Section: 18616</p>

      <p>
        <a
          id="wd-github"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
      </p>

      
      <TOC />

      
      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
          <li>
          <Link href="/Labs/Lab4" id="wd-lab4-link">
            Lab 4: Maintaining State in React Applications
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab5" id="wd-lab5-link">
            Lab 5: Implementing RESTful Web APIs with Express.js
          </Link>
        </li>
      </ul>
    </div>
  );
}

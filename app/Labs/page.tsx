// app/Labs/page.tsx
import Link from "next/link";
import TOC from "./TOC"; // Adjust the path if your TOC is elsewhere

export default function LabsPage() {
  return (
    <div id="wd-labs-page">
      <h1>Labs</h1>

     
      <p id="wd-name">Dhruthi Rajesh</p>

      <p>
        <a
          id="wd-github"
          href="https://github.com/dhruthi-06/kambaz-next-js"
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
      </ul>
    </div>
  );
}

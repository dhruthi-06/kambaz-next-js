import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input
        placeholder="Search for Assignments"
        id="wd-search-assignment"
      />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>

      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 – ENV + HTML
          </Link>
        </li>
        <ul>
          5 MODULES | 10 QUESTIONS | DUE ON SEPT 25 AT 12.00am | 100 points
        </ul>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/124"
            className="wd-assignment-link"
          >
            A2 – CSS + BOOTSTRAP
          </Link>
        </li>
         <ul>
          3 MODULES | 5 QUESTIONS | DUE ON OCT 5TH AT 12.00am | 100 points
        </ul>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/125"
            className="wd-assignment-link"
          >
            A3 – JAVASCRIPT + REACT
          </Link>
        </li>
         <ul>
          7 MODULES | 15 QUESTIONS | DUE ON OCT 29 AT 12.00am | 100 points
        </ul>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/126"
            className="wd-assignment-link"
          >
            A4 – STATE + REDUX
          </Link>
        </li>
         <ul>
          9 MODULES | 23 QUESTIONS | DUE ON NOV 26 AT 12.00am | 100 points
        </ul>
      </ul>
    </div>
  );
}

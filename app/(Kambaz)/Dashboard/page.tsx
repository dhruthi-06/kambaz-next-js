
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div
        id="wd-dashboard-courses"
        style={{ display: "inline-block", whiteSpace: "nowrap" }}
      >
        <div
          className="wd-dashboard-course"
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              alt="ReactJS"
              src="/images/reactjs.webp"
              width={200}
              height={150}
            />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div
          className="wd-dashboard-course"
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          <Link href="/Courses/2345" className="wd-dashboard-course-link">
            <Image
              alt="NodeJS"
              src="/images/nodejs.png"
              width={200}
              height={150}
            />
            <div>
              <h5>CS2345 Node JS</h5>
              <p className="wd-dashboard-course-title">Backend development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div
          className="wd-dashboard-course"
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          <Link href="/Courses/3456" className="wd-dashboard-course-link">
            <Image
              alt="Python"
              src="/images/python.png"
              width={200}
              height={150}
            />
            <div>
              <h5>CS3456 Python</h5>
              <p className="wd-dashboard-course-title">
                Data Science fundamentals
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div
          className="wd-dashboard-course"
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          <Link href="/Courses/4567" className="wd-dashboard-course-link">
            <Image alt="Java" src="/images/java.png" width={200} height={150} />
            <div>
              <h5>CS4567 Java</h5>
              <p className="wd-dashboard-course-title">
                Enterprise application development
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div
          className="wd-dashboard-course"
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          <Link href="/Courses/5678" className="wd-dashboard-course-link">
            <Image alt="C++" src="/images/csharp.png" width={200} height={150} />
            <div>
              <h5>CS5678 CSharp</h5>
              <p className="wd-dashboard-course-title">
                Competitive programming
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div
          className="wd-dashboard-course"
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          <Link href="/Courses/6789" className="wd-dashboard-course-link">
            <Image
              alt="Cybersecurity"
              src="/images/download.jpeg"
              width={200}
              height={150}
            />
            <div>
              <h5>CS6789 Cybersecurity</h5>
              <p className="wd-dashboard-course-title">Security essentials</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div
          className="wd-dashboard-course"
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          <Link href="/Courses/7890" className="wd-dashboard-course-link">
            <Image alt="SQL" src="/images/sql.png" width={200} height={150} />
            <div>
              <h5>CS7890 SQL</h5>
              <p className="wd-dashboard-course-title">Database management</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
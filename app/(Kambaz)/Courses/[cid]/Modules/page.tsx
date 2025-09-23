export default function Modules() {
  return (
    <div>
      <button>Collapse All</button>
      <button>View Progress</button>
      <select id="wd-select-one-genre" defaultValue="Publish All">
        <option value="Module 1">Publish All</option>
        <option value="Module 2">Publish None</option>
        <option value="Module 3">Publish One</option>
      </select>
      <button>+Module</button>

      <ul id="wd-modules">
        {/* Module 1 */}
        <li className="wd-module">
          <div className="wd-title">Module 1: Introduction to Web Development</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">Week 1 – Learning Objectives</span>
              <ul className="wd-content">
                <li className="wd-content-item">Understand the purpose and scope of web development.</li>
                <li className="wd-content-item">Get an overview of tools, browsers, and environments used in web development.</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Week 2 – Learning Objectives</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn HTML fundamentals: elements, tags, and attributes.</li>
                <li className="wd-content-item">Understand the structure of a web page (head, body, sections).</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 2 */}
        <li className="wd-module">
          <div className="wd-title">Module 2: Styling Web Pages with CSS</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">Week 3 – Learning Objectives</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to CSS: selectors, properties, and values.</li>
                <li className="wd-content-item">Understand the box model: margin, padding, and border.</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Week 4 – Learning Objectives</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn layout techniques: flexbox and grid.</li>
                <li className="wd-content-item">Apply responsive design principles using media queries.</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 3 */}
        <li className="wd-module">
          <div className="wd-title">Module 3: Introduction to JavaScript</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">Week 5 – Learning Objectives</span>
              <ul className="wd-content">
                <li className="wd-content-item">Understand variables, data types, and operators.</li>
                <li className="wd-content-item">Explore functions, conditionals, and loops.</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Week 6 – Learning Objectives</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn about DOM manipulation and events.</li>
                <li className="wd-content-item">Practice form validation and basic user interactions.</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 4 */}
        <li className="wd-module">
          <div className="wd-title">Module 4: Advanced Web Styling and Tools</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">Week 7 – Learning Objectives</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn advanced CSS techniques: transitions and animations.</li>
                <li className="wd-content-item">Explore CSS frameworks like Bootstrap or Tailwind.</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Week 8 – Learning Objectives</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Git and GitHub version control.</li>
                <li className="wd-content-item">Learn basic deployment using Netlify or Vercel.</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 5 */}
        <li className="wd-module">
          <div className="wd-title">Module 5: Final Project & Integration</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">Week 9 – Learning Objectives</span>
              <ul className="wd-content">
                <li className="wd-content-item">Plan and design a complete multi-page web application.</li>
                <li className="wd-content-item">Begin implementing the final project integrating HTML, CSS, and JS.</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Week 10 – Learning Objectives</span>
              <ul className="wd-content">
                <li className="wd-content-item">Test for responsiveness and accessibility.</li>
                <li className="wd-content-item">Submit the final project and reflect on learning outcomes.</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

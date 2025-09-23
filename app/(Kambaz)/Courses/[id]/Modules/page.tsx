
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
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">setting up learning envirornment</li>
                <li className="wd-content-item">
                  Learn how to work on node.js, Visual Studio code.
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Deployment</li>
                <li className="wd-content-item">
                  Delpoy the code using Kambaz, Vercel.
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label><br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />

      <label htmlFor="wd-description">Description</label><br />
      <textarea
        id="wd-description"
        defaultValue="My project is deployed on Vercel, and the application opens with a landing page that acts as a central hub. The page displays my full name and course section, along with links to the Lab exercises, the Kambaz application, and the GitHub repositories for both projects. Lab 1 serves as the entry point for the Labs section, and additional labs are accessible from there. Both the Labs pages and the Kambaz application include a link that navigates back to the landing page, so visitors can easily move between all parts of the project."
      ></textarea>
      <br /><br />

      <table>
        <tbody>
          {/* Points */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          {/* Assignment Group */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </select>
            </td>
          </tr>

          {/* Display Grade As */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
                <option>Complete/Incomplete</option>
                <option>Letter Grade</option>
              </select>
            </td>
          </tr>

          {/* Submission Type */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="ONLINE">
                <option>ONLINE</option>
                <option>ON PAPER</option>
                <option>NO SUBMISSION</option>
              </select>
              <br /><br />
              <div>
                <input type="checkbox" id="wd-text-entry" />
                <label htmlFor="wd-text-entry">Text Entry</label><br />

                <input type="checkbox" id="wd-website-url" />
                <label htmlFor="wd-website-url">Website URL</label><br />

                <input type="checkbox" id="wd-media-recordings" />
                <label htmlFor="wd-media-recordings">Media Recordings</label><br />

                <input type="checkbox" id="wd-student-annotation" />
                <label htmlFor="wd-student-annotation">Student Annotation</label><br />

                <input type="checkbox" id="wd-file-upload" />
                <label htmlFor="wd-file-upload">File Uploads</label>
              </div>
            </td>
          </tr>

          {/* Assign To */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>

          {/* Due Date */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" defaultValue="2025-09-20" />
            </td>
          </tr>

          {/* Available From */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available From</label>
            </td>
            <td>
              <input id="wd-available-from" type="date" defaultValue="2025-09-15" />
            </td>
          </tr>

          {/* Until */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Until</label>
            </td>
            <td>
              <input id="wd-available-until" type="date" defaultValue="2025-10-01" />
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <div>
        <button id="wd-cancel-btn">Cancel</button>
        <button id="wd-save-btn">Save</button>
      </div>
    </div>
  );
}

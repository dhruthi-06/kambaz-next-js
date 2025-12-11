/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h1>
        <center>Labs</center>
      </h1>
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>
      <div id="wd-lab1-headings">
        <h4>Heading Tags</h4>
        <h5>
          This section shows us the different heading tags which are used in the
          HTML.
        </h5>
      </div>
      <div id="wd-lab1-paragraphs">
        <h3>Paragraph Tags</h3>
        <p>
          This section shows us the paragraph tags which are used in the HTML.
        </p>
        <p>
          This is another paragraph tag. We often separate a long set of
          sentences with vertical spaces to make the text easier to read.
          Browsers ignore vertical white spaces and render all the text as one
          single set of sentences. To force the browser to add vertical spacing,
          wrap the paragraphs you want to separate with the paragraph tag{" "}
        </p>
        <p>
          This is the third paragraph. Wrap each paragraph with the paragraph
          tag to tell browsers to render the gaps between the paragraphs.
        </p>
      </div>
      <div id="wd-lab1-ordered-list">
        <h3>My favorite recipes</h3>
        <ol id="wd-lab1-my-favorite-recipes">
          <li>Spaghetti Carbonara</li>
          <li>Chicken Alfredo</li>
          <li>Beef Stroganoff</li>
        </ol>
      </div>
      <div id="wd-lab1-unordered-list">
        <h3>My favorite books</h3>
        <ul id="wd-lab1-my-favorite-books">
          <li>To Kill a Mockingbird by Harper Lee</li>
          <li>Dune by Frank Herbert</li>
          <li>Lord of the Rings by J.R.R. Tolkien</li>
        </ul>
      </div>
      <div id="wd-lab1-tables">
        <h4>Table Example</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Scores</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Quiz 1</td>
              <td>HTML Basics</td>
              <td>09-01-2023</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Quiz 2</td>
              <td>CSS Fundamentals</td>
              <td>09-08-2023</td>
              <td>90</td>
            </tr>
            <tr>
              <td>Quiz 3</td>
              <td>JavaScript Essentials</td>
              <td>09-15-2023</td>
              <td>88</td>
            </tr>
            <tr>
              <td>Quiz 4</td>
              <td>React Basics</td>
              <td>09-22-2023</td>
              <td>92</td>
            </tr>
            <tr>
              <td>Quiz 5</td>
              <td>Node.js Basics</td>
              <td>09-29-2023</td>
              <td>95</td>
            </tr>
            <tr>
              <td>Quiz 6</td>
              <td>Database Fundamentals</td>
              <td>10-06-2023</td>
              <td>89</td>
            </tr>
            <tr>
              <td>Quiz 7</td>
              <td>Web Security Basics</td>
              <td>10-13-2023</td>
              <td>91</td>
            </tr>
            <tr>
              <td>Quiz 8</td>
              <td>Deployment Basics</td>
              <td>10-20-2023</td>
              <td>94</td>
            </tr>
            <tr>
              <td>Quiz 9</td>
              <td>Performance Optimization</td>
              <td>10-27-2023</td>
              <td>87</td>
            </tr>
            <tr>
              <td>Quiz 10</td>
              <td>Progressive Web Apps</td>
              <td>11-03-2023</td>
              <td>93</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div id="wd-lab1-images">
          <h3>Image Tag</h3>
          Loading an image from the internet: <br />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Starship_S20.jpg"
            alt="Starship Image"
            width="500"
            height="300"
          />
        </div>
        <div id="wd-lab1-local-images">
          <h3>Local Image</h3>
          Loading an image from local system: <br />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Tesla-optimus-bot-gen-2-scaled_%28cropped%29.jpg/1280px-Tesla-optimus-bot-gen-2-scaled_%28cropped%29.jpg"
            alt="Tesla bot Image from local"
            width="500"
            height="300"
          />
        </div>
      </div>
      <div id="wd-lab1-webforms">
        <h3>Form element</h3>
        <form id="wd-lab1-text-input-form">
          <label htmlFor="wd-lab1-text-input">Username: </label>
          <input
            type="text"
            id="wd-lab1-text-input"
            placeholder="Enter your username"
          />
          <br />
          <br />
          <label htmlFor="wd-lab1-password-input">Password: </label>
          <input
            type="password"
            id="wd-lab1-password-input"
            placeholder="Enter your password"
          />
          <br />
          <br />
          <label htmlFor="wd-lab1-First-name">First Name: </label>
          <input
            type="text"
            id="wd-lab1-First-name"
            placeholder="Enter your first name"
          />
          <br />
          <br />
          <label htmlFor="wd-lab1-Last-name">Last Name: </label>
          <input
            type="text"
            id="wd-lab1-Last-name"
            placeholder="Enter your last name"
          />
          <br />
          <br />
        </form>
      </div>
      <div id="wd-lab1-text-area">
        <h3>Text Box</h3>
        <textarea
          defaultValue={
            "This is a text area. You can type multiple lines of text here."
          }
        ></textarea>
      </div>
      <div id="wd-lab1-buttons">
        <button
          type="button"
          onClick={() => alert("Hello! You clicked the button.")}
          id="wd-lab1-buttons"
        >
          Click Me!
        </button>
      </div>
      <div id="wd-lab1-upload-file">
        <button
          type="button"
          onClick={() =>
            alert(
              "File upload functionality is not implemented in this example."
            )
          }
          id="wd-lab1-upload-file"
        >
          Upload File
        </button>
      </div>
      <div style={{ display: "flex", gap: "50px" }}>
        <div id="wd-lab1-radio-buttons">
          <h3>Radio Buttons</h3>
          <label>
            <input
              type="radio"
              name="wd-lab1-radio-genre"
              id="wd-lab1-radio-genre-comedy"
            />
            <label htmlFor="wd-lab1-radio-genre-comedy">Comedy radio</label>
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="wd-lab1-radio-genre"
              id="wd-lab1-radio-genre-drama"
            />
            <label htmlFor="wd-lab1-radio-genre-drama">Drama radio</label>
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="wd-lab1-radio-genre"
              id="wd-lab1-radio-genre-science-fiction"
            />
            <label htmlFor="wd-lab1-radio-genre-science-fiction">
              Science Fiction radio
            </label>
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="wd-lab1-radio-genre"
              id="wd-lab1-radio-genre-fantasy"
            />
            <label htmlFor="wd-lab1-radio-genre-fantasy">Fantasy radio</label>
          </label>
          <br />
        </div>
        <div id="wd-lab1-checkboxes">
          <h3>Checkboxes</h3>
          <label>
            <input
              type="checkbox"
              id="wd-lab1-checkbox-genre-comedy"
              name="genre"
            />
            <label htmlFor="wd-lab1-checkbox-genre-comedy">
              Comedy checkbox
            </label>
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              id="wd-lab1-checkbox-genre-drama"
              name="genre"
            />
            <label htmlFor="wd-lab1-checkbox-genre-drama">Drama checkbox</label>
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              id="wd-lab1-checkbox-genre-science-fiction"
              name="genre"
            />
            <label htmlFor="wd-lab1-checkbox-genre-science-fiction">
              Science Fiction checkbox
            </label>
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              id="wd-lab1-checkbox-genre-fantasy"
              name="genre"
            />
            <label htmlFor="wd-lab1-checkbox-genre-fantasy">
              Fantasy checkbox
            </label>
          </label>
          <br />
        </div>
      </div>
      <h3 style={{ marginBottom: "1px" }}>Dropdowns</h3>
      <div style={{ display: "flex", gap: "50px" }}>
        <div id="wd-lab1-dropdown">
          <h4>Select one</h4>
          <label htmlFor="wd-lab1-dropdown-movies">
            Favourite movie genre:{" "}
          </label>
          <select id="wd-lab1-dropdown-movies">
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="science-fiction">Science Fiction</option>
            <option value="fantasy">Fantasy</option>
          </select>
        </div>
        <div id="wd-lab1-dropdown-multiple">
          <h4>Select multiple</h4>
          <label htmlFor="wd-lab1-dropdown-movies-multiple">
            Favourite movie genres:{" "}
          </label>
          <br /> <br />
          <select multiple id="wd-lab1-dropdown-movies-multiple">
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="science-fiction">Science Fiction</option>
            <option value="fantasy">Fantasy</option>
          </select>
        </div>
      </div>
      <h4>Other HTML Types</h4>
      <div id="wd-lab1-other-html-types">
        <label htmlFor="wd-lab1-email">Email: </label>
        <input type="email" id="wd-lab1-email" placeholder="Enter your email" />
        <br />
        <br />
        <label htmlFor="wd-lab1-start-salary">Starting Salary : </label>
        <input type="number" id="wd-lab1-start-salary" placeholder="100000" />
        <br />
        <br />
        <label htmlFor="wd-lab1-ratings">Rating: </label>
        <input type="range" id="wd-lab1-ratings" min="1" max="5" />
        <br />
        <br />
        <label htmlFor="wd-lab1-date-of-birth">Date of birth: </label>
        <input
          type="date"
          id="wd-lab1-date-of-birth"
          defaultValue="2000-01-01"
        />
        <br />
        <br />
      </div>
      <h4>Anchor tag</h4>
      Please
      <a
        href="https://github.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        click here{" "}
      </a>
      to visit my GitHub profile.
    </div>
  );
}

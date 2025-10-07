"use client";

import React from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";

export default function BootstrapForms() {
  return (
    <div id="wd-css-styling-forms">
      <h2>Forms</h2>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      <div id="wd-css-styling-dropdowns">
        <Form.Select>
          <option value="0" defaultChecked>
            Open this select menu
          </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>

      <div id="wd-css-styling-switches">
       
        <Form.Check
          type="switch"
          label="Unchecked switch checkbox input"
          defaultChecked={false}
        />
        <Form.Check
          type="switch"
          label="Checked switch checkbox input"
          defaultChecked={true}
        />
        <Form.Check
          type="switch"
          label="Unchecked disabled switch checkbox input"
          defaultChecked={false}
          disabled
        />
        <Form.Check
          type="switch"
          label="Checked disabled switch checkbox input"
          defaultChecked={true}
          disabled
        />
      </div>

      <div id="wd-css-styling-range-and-sliders">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Example range
          </Form.Label>
          <Col sm={10}>
            <Form.Range min={0} max={5} step={0.5} />
          </Col>
        </Form.Group>
      </div>

    <div id="wd-css-styling-addons">

  
  <InputGroup className="mb-3">
    <InputGroup.Text>$</InputGroup.Text>
    <InputGroup.Text>0.00</InputGroup.Text>
    <Form.Control />
  </InputGroup>

   <InputGroup>
          <Form.Control />
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
        </InputGroup>
</div>

<br />


      <div id="wd-css-responsive-forms-1">
        <Form.Group as={Row} className="mb-3" controlId="email1">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" defaultValue="email@example.com" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="password1">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="textarea2">
          <Form.Label column sm={2}>
            Bio
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" style={{ height: "100px" }} />
          </Col>
        </Form.Group>
      </div>

      <div id="wd-css-responsive-forms-2">
        <h3>Responsive Forms </h3>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>

          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={2}>
                Radios
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="First radio"
                  name="formHorizontalRadios"
                  defaultChecked
                />
                <Form.Check
                  type="radio"
                  label="Second radio"
                  name="formHorizontalRadios"
                />
                <Form.Check
                  type="radio"
                  label="Third radio"
                  name="formHorizontalRadios"
                />
                <br />
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  name="formHorizontalRadios"
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Col>
            <Button type="submit">Sign in</Button>
          </Col>
        </Form>
      </div>
    </div>
  );
}

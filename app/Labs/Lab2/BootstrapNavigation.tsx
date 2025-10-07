"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, NavItem, NavLink, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

export default function BootstrapCard() {
  return (
    <div id="wd-css-navigating-with-tabs-and-cards" className="mb-5">
      
      {/* Tabs Section */}
      <div id="wd-css-navigating-with-tabs" className="mb-5">
        <h2>Tabs</h2>
        <Nav variant="tabs">
          <NavItem>
            <NavLink href="#/Labs/Lab2/Active">Active</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Link1">Link 1</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Link2">Link 2</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab2/Disabled" disabled>
              Disabled
            </NavLink>
          </NavItem>
        </Nav>
      </div>

      {/* Cards Section */}
      <div id="wd-css-navigating-with-cards">
        <h2>Cards</h2>
        <Card style={{ width: "18rem" }}>
          <CardImg variant="top" src="/images/stacked.png" alt="Stacking Starship" />
          <CardBody>
            <CardTitle>Stacking Starship</CardTitle>
            <CardText>
              Stacking the most powerful rocket in history. Mars or bust!
            </CardText>
            <Button variant="primary">Boldly Go</Button>
          </CardBody>
        </Card>
      </div>

    </div>
  );
}
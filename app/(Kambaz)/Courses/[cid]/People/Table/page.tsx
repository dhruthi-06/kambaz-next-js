"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import PeopleDetails from "./Details";

export default function PeopleTable({
  users = [],
  fetchUsers,
}: {
  users?: any[];
  fetchUsers: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);

  return (
    <div id="wd-people-table" className="p-3">
      {/* DETAILS PANEL */}
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers(); // refresh list after closing
          }}
        />
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td
                className="wd-full-name text-nowrap"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowUserId(user._id);
                  setShowDetails(true);
                }}
              >
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>

              <td>{user.loginId}</td>
              <td>{user.section}</td>
              <td>{user.role}</td>
              <td>{user.lastActivity}</td>
              <td>{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

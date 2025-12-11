"use client";
import React, { useState } from "react";
import PeopleDetails from "./details";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import type { User } from "../../Account/client";

interface PeopleTableProps {
  users?: User[];
  fetchUsers?: () => void;
}

export default function PeopleTable({ users = [], fetchUsers }: PeopleTableProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);

  const openDetails = (id: string | undefined) => {
    if (!id) return;
    setShowUserId(id);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setShowUserId(null);
  };

  const handleUpdate = () => {
    fetchUsers?.();
  };

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={closeDetails}
          onUpdate={handleUpdate}
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
          {users.map((user, index) => {
            const userId = user._id ?? `user-${index}`;

            return (
              <tr key={userId}>
                <td className="wd-full-name text-nowrap">
                  <span
                    className="text-decoration-none"
                    onClick={() => openDetails(user._id)}
                    style={{
                      cursor: user._id ? "pointer" : "default",
                    }}
                  >
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    {user.firstName ?? ""} {user.lastName ?? ""}
                  </span>
                </td>

                <td className="wd-login-id">{user.username}</td>
                <td className="wd-section">{user.section ?? "N/A"}</td>
                <td className="wd-role">{user.role ?? "Student"}</td>
                <td className="wd-last-activity">{user.lastActivity ?? "-"}</td>
                <td className="wd-total-activity">{user.totalActivity ?? "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

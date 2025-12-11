"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "../details"; 
import axios from "axios";

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  section?: string;
  role?: string;
  lastActivity?: string;
  totalActivity?: string;
}


interface PeoplePageProps {
  courseId: string;
}

export default function PeoplePage({ courseId }: PeoplePageProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/courses/${courseId}/users`);
      setUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleShowDetails = (userId: string) => {
    setSelectedUserId(userId);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedUserId(null);
    fetchUsers(); // refresh the list after closing details
  };

  return (
    <div id="wd-people-table">
      {showDetails && selectedUserId && (
        <PeopleDetails uid={selectedUserId} onClose={handleCloseDetails} />
      )}

      {loading && <div className="text-center p-3">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

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
          {users.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleShowDetails(user._id)}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  {user.firstName} {user.lastName}
                </span>
              </td>
              <td className="wd-login-id">{user.username}</td>
              <td className="wd-section">{user.section ?? "N/A"}</td>
              <td className="wd-role">{user.role ?? "Student"}</td>
              <td className="wd-last-activity">{user.lastActivity ?? "-"}</td>
              <td className="wd-total-activity">{user.totalActivity ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {users.length === 0 && !loading && !error && (
        <div className="text-center p-3 text-muted">No users enrolled.</div>
      )}
    </div>
  );
}

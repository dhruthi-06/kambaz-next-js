"use client";
import { useState, useEffect } from "react";
import PeopleTable from "../../Courses/[cid]/People/Table/page";
import * as client from "../client";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  // FETCH ALL USERS
  const fetchUsers = async () => {
    const allUsers = await client.findAllUsers();
    setUsers(allUsers);
  };

  // FILTER BY ROLE
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const filtered = await client.findUsersByRole(role);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  // FILTER BY NAME
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const filtered = await client.findUsersByPartialName(name);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  // CREATE NEW USER
  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });

    setUsers([...users, user]); // update UI instantly
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Users</h3>

      {/* ADD NEW USER BUTTON */}
      <button
        onClick={createUser}
        className="float-end btn btn-danger mb-2 wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button>

      {/* SEARCH FIELD */}
      <FormControl
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
        onChange={(e) => filterUsersByName(e.target.value)}
      />

      {/* ROLE FILTER */}
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <div className="clearfix mb-3" />

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}

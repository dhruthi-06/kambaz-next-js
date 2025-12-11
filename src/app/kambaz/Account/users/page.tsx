"use client";
import { useEffect, useState, useCallback } from "react";
import PeopleTable from "./table";
import * as client from "../client"; 
import { FaPlus } from "react-icons/fa";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import type { User } from "../../Account/client";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState<User["role"]>();
  const [name, setName] = useState<string>("");

  const fetchUsers = useCallback(async () => {
    try {
      let allUsers: User[];

      if (role) {
        allUsers = await client.findUsersByRole(role);
      } else if (name) {
        allUsers = await client.findUsersByPartialName(name);
      } else {
        allUsers = await client.findAllUsers();
      }

      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [role, name]);

  const createUser = async () => {
    try {
      const timestamp = Date.now();
      const newUserData: User = {
        username: `newuser${timestamp}`,
        password: "password123",
        firstName: "New",
        lastName: "User",
        email: `newuser${timestamp}@example.com`,
        dob: "2000-01-01",
        role: "STUDENT",
        section: "S101",
      };

      const newUser = await client.createUser(newUserData);
      console.log("Created user:", newUser);

      await fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filterUsersByName = (searchName: string) => {
    setName(searchName);
    setRole(undefined);
  };

  const filterUsersByRole = (selectedRole: string) => {
    setRole(selectedRole as User["role"]);
    setName("");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <FormSelect
            value={role ?? ""}
            onChange={(e) => filterUsersByRole(e.target.value)}
            className="wd-select-role"
            style={{ width: "200px" }}
          >
            <option value="">All Roles</option>
            <option value="STUDENT">Student</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Admin</option>
            <option value="TA">TA</option>
          </FormSelect>

          <FormControl
            value={name}
            onChange={(e) => filterUsersByName(e.target.value)}
            placeholder="Search by name"
            className="wd-filter-name"
            style={{ width: "200px" }}
          />
        </div>

        <Button
          onClick={createUser}
          variant="danger"
          className="float-end wd-add-people"
        >
          <FaPlus className="me-2" />
          People
        </Button>
      </div>

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}

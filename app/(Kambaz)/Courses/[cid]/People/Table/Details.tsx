"use client";

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../../Account/client";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const fetchUser = async () => {
    if (!uid) return;
    const fetchedUser = await client.findUserById(uid);
    setUser(fetchedUser);
    setName(`${fetchedUser.firstName} ${fetchedUser.lastName}`);
    setEmail(fetchedUser.email || "");
    setRole(fetchedUser.role || "");
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  // SAVE UPDATES
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");

    const updatedUser = {
      ...user,
      firstName,
      lastName: lastName ?? "",
      email,
      role,
    };

    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose(); // close after saving
  };

  // DELETE USER
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>

      <hr />

      {/* ------- NAME + EDIT ICONS ------- */}
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
            style={{ cursor: "pointer" }}
          />
        )}
        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save"
            style={{ cursor: "pointer" }}
          />
        )}

        {!editing && (
          <div
            className="wd-name"
            onClick={() => setEditing(true)}
            style={{ cursor: "pointer" }}
          >
            {user.firstName} {user.lastName}
          </div>
        )}

        {editing && (
          <FormControl
            className="w-100 wd-edit-name mt-2"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </div>

      <br />

      {/* ------- ROLE ------- */}
      <b>Role:</b>{" "}
      {!editing ? (
        <span className="wd-roles">{user.role}</span>
      ) : (
        <select
          className="form-select w-100 mt-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">STUDENT</option>
          <option value="TA">TA</option>
          <option value="FACULTY">FACULTY</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      )}
      <br />

      {/* ------- EMAIL ------- */}
      <b>Email:</b>{" "}
      {!editing ? (
        <span className="wd-email">{user.email}</span>
      ) : (
        <FormControl
          className="w-100 mt-2"
          type="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
      <br />


      <b>Login ID:</b> <span>{user.loginId}</span> <br />
      <b>Section:</b> <span>{user.section}</span> <br />
      <b>Total Activity:</b> <span>{user.totalActivity}</span> <br />

      <hr />

      {/* ------- BUTTONS ------- */}
      {editing ? (
        <button onClick={saveUser} className="btn btn-primary float-end ms-2">
          Save
        </button>
      ) : (
        <button
          onClick={() => deleteUser(uid)}
          className="btn btn-danger float-end wd-delete"
        >
          Delete
        </button>
      )}

      <button
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}

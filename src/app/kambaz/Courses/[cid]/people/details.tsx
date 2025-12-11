import { useEffect, useState, useCallback } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  loginId: string;
  section: string;
  totalActivity: string;
}

const client = {
  findUserById: async (id: string): Promise<User> => ({
    _id: id,
    firstName: "John",
    lastName: "Doe",
    role: "STUDENT",
    loginId: "12345",
    section: "A1",
    totalActivity: "10 hours"
  }),
  updateUser: async (user: User) => console.log("Updating:", user),
  deleteUser: async (id: string) => console.log("Deleting:", id)
};

export default function PeopleDetails({ uid, onClose }: { uid: string | null; onClose: () => void }) {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveUser = async () => {
    if (!user) return;
    const [firstName, ...rest] = name.trim().split(" ");
    const lastName = rest.join(" ");
    const updatedUser: User = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  const deleteUser = async (uid: string | null) => {
    if (!uid) return;
    await client.deleteUser(uid);
    onClose();
  };

  const fetchUser = useCallback(async () => {
    if (!uid) return;

    setLoading(true);
    setError(null);

    try {
      const fetchedUser = await client.findUserById(uid);
      setUser(fetchedUser);
      setName(`${fetchedUser.firstName || ""} ${fetchedUser.lastName || ""}`.trim());
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError(`User with ID ${uid} not found`);
        } else {
          setError("Failed to load user details");
        }
      } else {
        setError("Failed to load user details");
      }
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid, fetchUser]);

  if (!uid) return null;

  return (
    <div className="position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow" style={{ width: '25%', zIndex: 1000 }}>
      <button onClick={onClose} className="btn position-fixed top-0 end-0">
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="fs-1 text-secondary me-2" />
        <hr />
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {user && (
        <>
          <div className="text-danger fs-4">
            {!editing && <FaPencil className="fs-5 mt-2 float-end" onClick={() => setEditing(true)} style={{ cursor: 'pointer' }} />}
            {editing && <FaCheck className="fs-5 mt-2 me-2 float-end" onClick={saveUser} style={{ cursor: 'pointer' }} />}
            {!editing && <div onClick={() => setEditing(true)} style={{ cursor: 'pointer' }}>{user.firstName} {user.lastName}</div>}
            {editing && (
              <input
                type="text"
                className="form-control w-75"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") saveUser(); }}
                autoFocus
              />
            )}
          </div>
          <b>Role: </b> <span>{user.role}</span><br />
          <b>Login ID: </b> <span>{user.loginId}</span><br />
          <b>Section: </b> <span>{user.section}</span><br />
          <b>Total Activity: </b> <span>{user.totalActivity}</span><br />
          <hr />
          <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end">Delete</button>
          <button onClick={onClose} className="btn btn-secondary float-end me-2">Cancel</button>
        </>
      )}
    </div>
  );
}

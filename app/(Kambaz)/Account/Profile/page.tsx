"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import * as db from "../../Database";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import type { User } from "../reducer";

// ✅ Define the shape of a user
type UserProfile = {
  _id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  role?: string;
};

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  // ✅ Strongly typed local state
  const [profile, setProfile] = useState<UserProfile>({});

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    // Load user data into profile state
    setProfile({
      _id: currentUser._id,
      username: currentUser.username,
      password: currentUser.password,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      dob: currentUser.dob,
      email: currentUser.email,
      role: currentUser.role,
    });
  }, [currentUser, router]);

  const handleUpdate = () => {
    if (!currentUser) return;
    
    // Update the current user in Redux
    const updatedUser: User = {
      ...currentUser,
      username: profile.username || currentUser.username,
      password: profile.password || currentUser.password,
      firstName: profile.firstName || currentUser.firstName,
      lastName: profile.lastName || currentUser.lastName,
      dob: profile.dob || currentUser.dob,
      email: profile.email || currentUser.email,
      role: (profile.role as User["role"]) || currentUser.role,
    };
    
    // Update in localStorage if user was stored there
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const userIndex = storedUsers.findIndex(u => u._id === currentUser._id);
    
    if (userIndex !== -1) {
      // User exists in localStorage, update it
      storedUsers[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(storedUsers));
    } else {
      // User doesn't exist in localStorage, might be from database
      // But we can still add it to localStorage for future updates
      storedUsers.push(updatedUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));
    }
    
    dispatch(setCurrentUser(updatedUser));
    alert("Profile updated successfully!");
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  // Show loading or redirect message
  if (!currentUser) {
    return (
      <div className="p-4">
        <p>Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <div id="wd-profile-screen" className="p-4">
      <h3 className="mb-3">Profile</h3>

      <div>
        <FormControl
          id="wd-username"
          className="mb-2"
          placeholder="Username"
          value={profile.username || ""}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        />
        <FormControl
          id="wd-password"
          className="mb-2"
          type="password"
          placeholder="Password"
          value={profile.password || ""}
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        />
        <FormControl
          id="wd-firstname"
          className="mb-2"
          placeholder="First Name"
          value={profile.firstName || ""}
          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        />
        <FormControl
          id="wd-lastname"
          className="mb-2"
          placeholder="Last Name"
          value={profile.lastName || ""}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />
        <FormControl
          id="wd-dob"
          className="mb-2"
          type="date"
          placeholder="Date of Birth"
          value={profile.dob || ""}
          onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        />
        <FormControl
          id="wd-email"
          className="mb-2"
          type="email"
          placeholder="Email"
          value={profile.email || ""}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />

        <FormSelect
          id="wd-role"
          className="mb-3"
          value={profile.role || "STUDENT"}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
          <option value="TA">TA</option>
        </FormSelect>

        <div className="d-flex gap-2 mb-3">
          <Button
            id="wd-update-profile-btn"
            variant="primary"
            onClick={handleUpdate}
          >
            Update Profile
          </Button>
          <Button
            id="wd-signout-btn"
            variant="danger"
            onClick={signout}
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}

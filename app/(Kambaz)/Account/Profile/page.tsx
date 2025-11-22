"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [profile, setProfile] = useState<any>({});

  // Load profile when user logs in
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  }, [currentUser, router]);

  // Update profile on server
  const updateProfile = async () => {
    if (!profile._id) return;
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile)); // update Redux with server result
    alert("Profile updated!");
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  if (!currentUser) {
    return <div className="p-4">Redirecting...</div>;
  }

  return (
    <div id="wd-profile-screen" className="p-4">
      <h3 className="mb-3">Profile</h3>

      <FormControl
        className="mb-2"
        placeholder="Username"
        value={profile.username || ""}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />

      <FormControl
        className="mb-2"
        type="password"
        placeholder="Password"
        value={profile.password || ""}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
      />

      <FormControl
        className="mb-2"
        placeholder="First Name"
        value={profile.firstName || ""}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
      />

      <FormControl
        className="mb-2"
        placeholder="Last Name"
        value={profile.lastName || ""}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
      />

      <FormControl
        type="date"
        className="mb-2"
        value={profile.dob || ""}
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
      />

      <FormControl
        className="mb-2"
        type="email"
        placeholder="Email"
        value={profile.email || ""}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />

      <FormSelect
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

      <div className="d-flex gap-2">
        <Button variant="primary" className="w-50" onClick={updateProfile}>
          Update
        </Button>

        <Button variant="danger" className="w-50" onClick={signout}>
          Sign out
        </Button>
      </div>
    </div>
  );
}

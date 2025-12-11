import * as client from "./client";
import { useEffect, useState, useCallback } from "react";  
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import type { ReactNode } from "react";

export default function Session({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = useCallback(async () => { 
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          dispatch(setCurrentUser(null));
        } else {
          console.error("Profile fetch error:", err.response?.data);
        }
      } else {
        console.error("Unknown error:", err);
      }
    } finally {
      setPending(false);
    }
  }, [dispatch]);  

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]); 

  if (pending) {
    return null;
  }

  return <>{children}</>;
}
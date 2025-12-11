"use client";
import React, { useEffect, useState } from "react";
import * as client from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState<string>("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState<string>("");

  const fetchWelcomeOnClick = async () => {
    try {
      const message = await client.fetchWelcomeMessage();
      setWelcomeOnClick(message);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWelcomeOnLoad = async () => {
    try {
      const message = await client.fetchWelcomeMessage();
      setWelcomeOnLoad(message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWelcomeOnLoad();
  }, []);

  return (
    <div>
      <h3>HTTP Client</h3>

      <h4>Requesting on Click</h4>
      <button className="btn btn-primary me-2" onClick={fetchWelcomeOnClick}>
        Fetch Welcome
      </button>
      <div>Response: <b>{welcomeOnClick}</b></div>

      <h4>Requesting on Load</h4>
      Response From Server: <b>{welcomeOnLoad}</b>
      <hr />
    </div>
  );
}

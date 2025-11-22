"use client";

import React, { useEffect, useState } from "react";
import * as client from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");
  const [error, setError] = useState("");

  const fetchWelcomeOnClick = async () => {
    try {
      setError("");
      const message = await client.fetchWelcomeMessage();
      setWelcomeOnClick(message);
    } catch (err: any) {
      handleError(err);
    }
  };

  const fetchWelcomeOnLoad = async () => {
    try {
      setError("");
      const message = await client.fetchWelcomeMessage();
      setWelcomeOnLoad(message);
    } catch (err: any) {
      handleError(err);
    }
  };

  const handleError = (err: any) => {
    if (err.response?.status === 404) {
      setError(
        "Server is not running or route not found. Ensure Node server runs on port 4000."
      );
    } else {
      setError(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchWelcomeOnLoad();
  }, []);

  return (
    <div>
      <h3>HTTP Client</h3>
      <hr />

      {error && <div className="alert alert-warning">{error}</div>}

      <h4>Requesting on Click</h4>
      <button className="btn btn-primary me-2" onClick={fetchWelcomeOnClick}>
        Fetch Welcome
      </button>
      <br />
      Response from server: <b>{welcomeOnClick || "No response yet"}</b>

      <hr />

      <h4>Requesting on Load</h4>
      Response from server: <b>{welcomeOnLoad || "No response yet"}</b>

      <hr />
    </div>
  );
}

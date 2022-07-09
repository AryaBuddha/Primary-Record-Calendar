import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

import Landing from "./Views/Landing";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [rawUser, setRawUser] = useState(localStorage.getItem("user"));
  useEffect(() => {
    localStorage.setItem("user", user);
    setRawUser(user);
  }, [user]);
  return (
    <>
      <form>
        <input
          placeholder="Debug Email"
          className="p-3 border-2 fixed"
          value={rawUser}
          onChange={(e) => {
            setRawUser(e.target.value);
          }}
        />
        <button
          className="p-3 border-4 fixed ml-60"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setUser(rawUser);
            localStorage.setItem("user", rawUser);
          }}
        >
          Submit
        </button>
      </form>
      <h1 className="fixed mt-16 font-bold">DEBUG ONLY</h1>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Landing theUser={user} setTheUser={setUser} />}
            />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;

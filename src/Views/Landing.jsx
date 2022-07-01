import React, { useState } from "react";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { AiOutlineGoogle } from "react-icons/ai";

import Form from "./Components/Form";
import Events from "./Components/Events";

const Landing = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/googleauth`,
        { code: codeResponse.code, user: "bob@gmail.com" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    flow: "auth-code",
    scope:
      "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar",
  });

  return (
    <div className="grid place-items-center h-screen p-6">
      <div className="max-w-5xl max-h-[40rem] h-full w-full shadow-2xl shadow-blue-500/40 rounded-2xl p-6">
        <div className="flex">
          <h1 className="text-3xl font-semibold">Events</h1>
          <button className="border-blue-50" onClick={() => login()}>
            Sign in with Google
          </button>
        </div>

        <Form />
        <Events />
      </div>
    </div>
  );
};

export default Landing;

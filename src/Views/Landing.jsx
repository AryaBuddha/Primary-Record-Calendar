import React from "react";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { AiOutlineGoogle } from "react-icons/ai";

import Form from "./Components/Form";

const Landing = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      axios.post(
        "http://localhost:4000/googleauth",
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
      <div className="max-w-5xl max-h-[35rem] h-full w-full shadow-2xl shadow-blue-500/40 rounded-2xl p-6">
        <div className="flex">
          <h1 className="text-3xl font-semibold">Events</h1>
          <button className="border-blue-50" onClick={() => login()}>
            Sign in withf google
          </button>
        </div>

        <h1 className="text-xl mt-5">Create new Event</h1>

        <Form />
      </div>
    </div>
  );
};

export default Landing;

import React from "react";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

import { AiOutlineGoogle } from "react-icons/ai";

const Landing = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar.events",
  });

  return (
    <div className="grid place-items-center h-screen p-6">
      <div className="max-w-5xl max-h-[35rem] h-full w-full shadow-2xl shadow-blue-500/40 rounded-2xl p-6">
        <div className="flex">
          <h1 className="text-3xl font-semibold">Events</h1>
          <button className="border-blue-50" onClick={() => login()}>
            Sign in with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;

import React, { useState, useEffect } from "react";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import Form from "./Components/Form";
import Events from "./Components/Events";

const Landing = ({ theUser, setTheUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(theUser);
  }, [theUser]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/googleauth`,
          { code: codeResponse.code },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setUser(res.data.user);
          setTheUser(res.data.user);
        });
    },
    flow: "auth-code",
    scope:
      "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email",
  });

  return (
    <div className="grid place-items-center h-screen p-6">
      <div className="max-w-5xl max-h-[40rem] h-full w-full shadow-2xl shadow-blue-500/40 rounded-2xl p-6">
        <div className="flex">
          <h1 className="text-3xl font-semibold">Events</h1>
          <button className="border-blue-50" disabled onClick={() => login()}>
            Sign in with Google
          </button>
        </div>

        <Form user={user} />
        <Events user={user} />
      </div>
    </div>
  );
};

export default Landing;

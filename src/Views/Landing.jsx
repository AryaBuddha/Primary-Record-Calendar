import React, { useState, useEffect } from "react";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import Form from "./Components/Form";
import Events from "./Components/Events";
import Services from "./Components/Services";

const Landing = ({ theUser, setTheUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(theUser);
  }, [theUser]);

  return (
    <div className="grid place-items-center h-screen p-6">
      <div className="max-w-5xl max-h-[40rem] h-full w-full shadow-2xl shadow-blue-500/40 rounded-2xl p-6">
        <div className="flex">
          <h1 className="text-3xl font-semibold">Events</h1>
          <Services user={user} setUser={setUser} setTheUser={setTheUser} />
        </div>

        <Form user={user} />
        <Events user={user} />
      </div>
    </div>
  );
};

export default Landing;

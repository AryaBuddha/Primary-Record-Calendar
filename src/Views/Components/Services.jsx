import React, { useEffect, useState } from "react";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import googleLogo from "../../Assets/google.png";
import { AiOutlineApple, AiOutlineCheck } from "react-icons/ai";

const Services = ({ user, setUser, setTheUser }) => {
  const [service, setService] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const loginGoogle = useGoogleLogin({
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
          setSuccessMessage("Successfully logged in with Google!");
        });
    },
    flow: "auth-code",
    scope:
      "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email",
  });

  const loginiCal = () => {
    axios

      .post(
        `${process.env.REACT_APP_BACKEND_URL}/addcal`,
        { user: user },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setSuccessMessage(
          `Successfully added! Please add ${process.env.REACT_APP_BACKEND_URL}/calendars/getCal/${res.data.iCalID} to your calendar`
        );
      });
  };

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/services`,
        { user: user },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setService(res.data.service);
      });
    setSuccessMessage(null);
  }, [user]);

  console.log(service);
  return (
    <>
      <div className="ml-11 flex w-full gap-5 items-center flex-wrap">
        <button
          className="bg-[#1967D2] hover:bg-[#4285F4] hover:cursor-pointer p-2 border-2 rounded-xl text-white flex items-center px-5 disabled:bg-slate-600 disabled:cursor-not-allowed"
          onClick={() => loginGoogle()}
          disabled={service != "google" && service != "none"}
        >
          <img src={googleLogo} className="h-5 mr-3" />
          {service != "google" ? (
            <h1 className="text-sm font-semibold">Sign in with Google</h1>
          ) : (
            <AiOutlineCheck size={17} />
          )}
        </button>
        <button
          className="bg-black hover:bg-[#555555] hover:cursor-pointer p-2 border-2 rounded-xl text-white flex items-center px-10 disabled:bg-slate-600 disabled:cursor-not-allowed"
          onClick={() => {
            loginiCal();
          }}
          disabled={service != "ical" && service != "none"}
        >
          <AiOutlineApple />
          {service != "ical" ? (
            <h1 className="text-sm font-semibold ml-3">Add to Apple</h1>
          ) : (
            <AiOutlineCheck size={17} className="ml-3" />
          )}
        </button>

        <h1 className="text-sm text-green-600">{successMessage}</h1>
      </div>
    </>
  );
};

export default Services;

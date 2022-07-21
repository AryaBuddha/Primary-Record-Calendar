import React, { useState, useEffect } from "react";

import axios from "axios";

const Form = ({ user }) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [recurring, setRecurring] = useState("DAILY");

  const [preferences, setPreferences] = useState(null);

  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/preferences`,
        { user: user },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setPreferences(res.data);
        console.log(res.data);
      });
  }, [user]);

  const handleSubmit = () => {
    if (
      title.length > 0 &&
      notes.length > 0 &&
      startDate &&
      endDate &&
      recurring
    ) {
      const event = {
        summary: title,
        location: "100 Washington Street",
        description: notes,
        start: {
          dateTime: `${startDate}:00`,
          timeZone: preferences.timezone,
        },
        end: {
          dateTime: `${endDate}:00`,
          timeZone: preferences.timezone,
        },
        recurrence: recurring != "None" ? [`RRULE:FREQ=${recurring}`] : [],
        visibility: preferences.visibility,
        transparency:
          preferences.availability == "busy" ? "opaque" : "transparent",
        reminders: {
          useDefault: false,
          overrides: [{ method: "popup", minutes: preferences.reminderBefore }],
        },
      };

      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/events/add`,
          { event: event, user: user },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            setSuccess(res.data.message);
          }
          setErrors(null);
        });
    } else {
      setErrors("Please fill out all fields");
    }
  };

  return (
    <>
      <h1 className="text-xl mt-5">Create new Event</h1>
      <div className="w-full flex flex-wrap justify-between mt-3 gap-y-3">
        <div className="flex items-center">
          <h1 className="mr-3">Title:</h1>
          <input
            className="border-2 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>

        <div className="flex items-center ">
          <h1 className="mr-3">Location:</h1>
          <h1 className="border-2 text-black cursor-not-allowed rounded-lg w-56">
            100 Washington Street
          </h1>
        </div>

        <div className="flex items-center ">
          <h1 className="mr-3">Notes:</h1>
          <input
            className="border-2 rounded-lg "
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
          />
        </div>

        <div className="flex items-center ">
          <h1 className="mr-3">Start Date:</h1>
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="datetime-local"
          />
        </div>

        <div className="flex items-center ">
          <h1 className="mr-3">End Date:</h1>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="flex items-center ">
          <h1 className="mr-3">Recurring:</h1>
          <select
            value={recurring}
            onChange={(e) => setRecurring(e.target.value)}
          >
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="None">None</option>
          </select>
        </div>
      </div>
      <h1 className="text-red-600 font-bold">{errors}</h1>
      <div className="flex items-center align-center">
        <button
          className="bg-[#2D4566] rounded-lg p-2 text-white mt-7 hover:bg-[#1A1D35]"
          onClick={() => handleSubmit()}
        >
          Create
        </button>
        {success && (
          <h1 className="ml-5 rounded-lg font-semibold text-green-600 p-2 mt-7">
            {success}
          </h1>
        )}
      </div>
    </>
  );
};

export default Form;

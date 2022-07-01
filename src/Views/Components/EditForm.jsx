import React, { useState } from "react";

import axios from "axios";
import dayjs from "dayjs";

const EditForm = ({
  data,
  primaryID,
  googleEventID,
  setEditMode,
  refreshData,
}) => {
  const [title, setTitle] = useState(data.summary);
  const [notes, setNotes] = useState(data.description);
  const [startDate, setStartDate] = useState(
    dayjs(data.start.dateTime).format("YYYY-MM-DDTHH:mm")
  );
  const [endDate, setEndDate] = useState(
    dayjs(data.end.dateTime).format("YYYY-MM-DDTHH:mm")
  );
  const [recurring, setRecurring] = useState("DAILY");

  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);

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
        description: `Notes:\n${notes}`,
        start: {
          dateTime: `${startDate}:00`,
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: `${endDate}:00`,
          timeZone: "America/Los_Angeles",
        },
        recurrence: recurring != "None" ? [`RRULE:FREQ=${recurring}`] : [],
        reminders: {
          useDefault: true,
        },
      };

      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/events/edit`,
          {
            event: event,
            user: "bob@gmail.com",
            primaryID: primaryID,
            googleEventID: googleEventID,
          },
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
            refreshData();
            setEditMode(false);
          }
          setErrors(null);
        });
    } else {
      setErrors("Please fill out all fields");
    }
  };

  return (
    <>
      <div className="w-full shadow-md rounded-lg p-3 font-light mb-9">
        <h1 className="text-xl mt-5">Edit Event</h1>
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
            <textarea
              className="border-2 rounded-lg"
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
            Save
          </button>
          {success && (
            <h1 className="ml-5 rounded-lg font-semibold text-green-600 p-2 mt-7">
              {success}
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default EditForm;

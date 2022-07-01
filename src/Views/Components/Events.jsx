import React, { useEffect, useState } from "react";

import EditForm from "./EditForm";

import dayjs from "dayjs";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const Event = ({ data, primaryID, googleEventID, refreshData }) => {
  const deleteEvent = () => {
    axios
      .post(
        `${process.env.API_URL}/events/delete`,
        {
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
      .then(() => {
        refreshData();
      });
  };

  const recurText = (recur) => {
    if (recur === "RRULE:FREQ=DAILY") {
      return "daily";
    } else if (recur === "RRULE:FREQ=WEEKLY") {
      return "weekly";
    } else if (recur === "RRULE:FREQ=MONTHLY") {
      return "monthly";
    }
  };

  const [editMode, setEditMode] = useState(false);

  if (editMode) {
    return (
      <EditForm
        data={data}
        primaryID={primaryID}
        googleEventID={googleEventID}
        setEditMode={setEditMode}
        refreshData={refreshData}
      />
    );
  }
  return (
    <div className="w-full shadow-md rounded-lg p-3 font-light mb-9">
      <div className="px-7">
        <div className="flex w-full justify-between">
          <h1 className="text-xl">{data.summary}</h1>
          <div className="flex w-11 justify-between">
            <FiEdit2
              className="cursor-pointer"
              size={18}
              onClick={() => {
                setEditMode(true);
              }}
            />
            <MdDeleteOutline
              className="cursor-pointer"
              size={18}
              onClick={() => {
                deleteEvent();
              }}
            />
          </div>
        </div>
        <h1>{data.location}</h1>

        <div className="flex w-full  border-b-2 pb-3 mb-3">
          {dayjs(data.start.dateTime).format("MMM DD, YYYY") ===
          dayjs(data.end.dateTime).format("MMM DD, YYYY") ? (
            <>
              <h1>
                {dayjs(data.start.dateTime).format("MMM DD, YYYY h:mm A")} -{" "}
                {dayjs(data.start.endTime).format("h:mm A")}
              </h1>
              {data.recurrence.length != 0 && (
                <h1>, repeats {recurText(data.recurrence[0])}</h1>
              )}
            </>
          ) : (
            <>
              <h1>
                {dayjs(data.start.dateTime).format("MMM DD, YYYY h:mm A")} -{" "}
                {dayjs(data.end.dateTime).format("MMM DD, YYYY h:mm A")}
              </h1>
              {data.recurrence.length != 0 && (
                <h1> repeats {recurText(data.recurrence[0])}</h1>
              )}
            </>
          )}
        </div>

        <h1 style={{ whiteSpace: "pre-line" }}>{data.description}</h1>
      </div>
    </div>
  );
};

const Events = () => {
  const [data, setData] = useState(null);

  const refreshData = () => {
    axios
      .post(
        `${process.env.API_URL}/events/getAll`,
        { user: "bob@gmail.com" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setData(res.data.events);
        console.log(res.data);
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="mt-11 ">
      <h1 className="text-xl mt-5">Events</h1>
      <div className="mt-3 h-[17.5rem] overflow-auto">
        {data &&
          data.map((event) => {
            console.log(event);
            return (
              <Event
                data={event.event}
                primaryID={event.primaryID}
                googleEventID={event.googleEventID}
                refreshData={refreshData}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Events;

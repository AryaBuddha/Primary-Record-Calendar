import React, { useEffect, useState } from "react";

import EditForm from "./EditForm";

import dayjs from "dayjs";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const Event = ({ data, primaryId, googleEventId, refreshData, user }) => {
  const deleteEvent = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/events/delete`,
        {
          user: user,
          primaryId: primaryId,
          googleEventId: googleEventId,
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
        primaryId={primaryId}
        googleEventId={googleEventId}
        setEditMode={setEditMode}
        refreshData={refreshData}
        user={user}
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

const Events = ({ user }) => {
  console.log(user);
  const [data, setData] = useState(null);

  const refreshData = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/events/getAll`,
        { user: user },
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
  }, [user]);

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
                primaryId={event.primaryId}
                googleEventId={event.googleEventId}
                refreshData={refreshData}
                user={user}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Events;

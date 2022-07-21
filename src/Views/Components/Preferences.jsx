import React, { useState, useEffect } from "react";

import axios from "axios";

import { BiCog } from "react-icons/bi";

const Preferences = ({ user }) => {
  const [preferences, setPreferences] = useState(null);

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

  if (!preferences) {
    return null;
  }
  return (
    <div data-theme="mytheme" class="dropdown dropdown-left">
      <label tabindex="0">
        <BiCog
          size={40}
          className="font-semibold hover:bg-slate-300 p-1 rounded-xl"
        />
      </label>
      <div
        tabindex="0"
        class="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content"
      >
        <div class="card-body">
          <h3 class="card-title mt-3">Preferences</h3>
          <h1 className="text-sm font-extralight mt-2">Timezone</h1>
          <h1>{preferences.timezone}</h1>
          <h1 className="text-sm font-extralight mt-2">Availability</h1>
          <h1>
            {preferences.availability[0].toUpperCase()}
            {preferences.availability.slice(1, preferences.availability.length)}
          </h1>
          <h1 className="text-sm font-extralight mt-2">Availability</h1>
          <h1>
            {preferences.visibility[0].toUpperCase()}
            {preferences.visibility.slice(1, preferences.visibility.length)}
          </h1>
          <h1 className="text-sm font-extralight mt-2">Reminder</h1>
          <h1>
            {preferences.reminderBefore} minutes before - push notification
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Preferences;

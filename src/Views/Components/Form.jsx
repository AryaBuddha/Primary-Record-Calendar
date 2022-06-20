import React, { useState } from "react";

const Form = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [recurring, setRecurring] = useState(false);

  return (
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
        <h1 className="border-2 text-slate-400  rounded-lg w-56">
          100 Washington Street
        </h1>
      </div>

      <div className="flex items-center ">
        <h1 className="mr-3">Notes:</h1>
        <input
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
        </select>
      </div>
    </div>
  );
};

export default Form;

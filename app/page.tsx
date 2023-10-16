"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface SalesTarget {
  startDate: string;
  endDate: string;
  monthlyTarget: number;
  workingDays: number;
}

const page: React.FC = () => {
  const [state, setState] = useState<SalesTarget>({
    startDate: "",
    endDate: "",
    monthlyTarget: 435,
    workingDays: 0,
  });
  const [dailyTarget, setDailyTarget] = useState<number>(0);
  const [workingDays, setWorkingDays] = useState<number>(0);

  function calculateDailyTarget(
    startDate: Date,
    endDate: Date,
    monthlyTarget: number
  ): number {
    const totalDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    return monthlyTarget / totalDays;
  }

  function countWorkingDays(startDate: Date, endDate: Date): number {
    let count = 0;
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      // Exclude Fridays (weekday = 6) from the working days count
      if (currentDate.getDay() !== 6) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
  }

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState((prevState) => ({ ...prevState, startDate: value }));
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState((prevState) => ({ ...prevState, endDate: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { startDate, endDate, monthlyTarget } = state;
    const dailyTarget = calculateDailyTarget(
      new Date(startDate),
      new Date(endDate),
      Number(monthlyTarget) // convert monthlyTarget to number
    );
    setDailyTarget(dailyTarget);
    const countDays = countWorkingDays(new Date(startDate), new Date(endDate));
    setWorkingDays(countDays);
    console.log("Daily Sales Target: $" + dailyTarget.toFixed(2));
  };

  return (
    <div className="max-w-lg mx-auto flex justify-center mt-28">
      <div className="">
        <h1 className="text-2xl font-bold text-center text-slate-700">
          Dialy Target Calculator
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-10 mt-10">
            <div className="">
              <label className="block mb-2 text-sm text-slate-700">
                Start Date
              </label>
              <input
                type="date"
                value={state.startDate}
                onChange={handleStartDateChange}
                className="border  border-gray-400 text-slate-700 p-2 rounded"
              />
            </div>
            <div className="">
              <label className="block mb-2 text-sm text-slate-700">
                End Date
              </label>
              <input
                type="date"
                value={state.endDate}
                onChange={handleEndDateChange}
                className="border  border-gray-400 text-slate-700 p-2 rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-8 w-36"
          >
            Calculate
          </button>
        </form>
        <div className="mt-8 text-slate-700">
          <label>Daily Sales Target: </label>
          <span className="text-blue-500 text-xl font-medium ml-3">
            ${dailyTarget.toFixed(2)}
          </span>
          <p>
            Working Days:{" "}
            <span className="text-blue-500 text-xl font-medium ml-3">
              {workingDays}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;

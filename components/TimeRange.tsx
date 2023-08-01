"use client";
import { FC } from "react";

interface TimeRangeProps {
  setTimeRange: (range: "short_term" | "medium_term" | "long_term") => void;
}

export const TimeRange: FC<TimeRangeProps> = ({ setTimeRange }) => (
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-4 mb-4">
    <button
      className="px-2 sm:px-4 py-2 text-xs sm:text-base text-white bg-green-600 hover:bg-green-700 rounded"
      onClick={() => setTimeRange("short_term")}
    >
      Last 30 days
    </button>
    <button
      className="px-2 sm:px-4 py-2 text-xs sm:text-base text-white bg-green-600 hover:bg-green-700 rounded"
      onClick={() => setTimeRange("medium_term")}
    >
      Last 6 months
    </button>
    <button
      className="px-2 sm:px-4 py-2 text-xs sm:text-base text-white bg-green-600 hover:bg-green-700 rounded"
      onClick={() => setTimeRange("long_term")}
    >
      Last 12 months
    </button>
  </div>
);

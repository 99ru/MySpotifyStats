"use client";
import { FC } from "react";

interface TimeRangeProps {
  setTimeRange: (range: 'short_term' | 'medium_term' | 'long_term') => void;
}

export const TimeRange: FC<TimeRangeProps> = ({ setTimeRange }) => (
  <div className="flex space-x-4 mb-4">
    <button
      className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded"
      onClick={() => setTimeRange("short_term")}
    >
      Last 30 days
    </button>
    <button
      className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded"
      onClick={() => setTimeRange("medium_term")}
    >
      Last 6 months
    </button>
    <button
      className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded"
      onClick={() => setTimeRange("long_term")}
    >
      Last 12 months
    </button>
  </div>
);

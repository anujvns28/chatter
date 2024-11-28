import { useState, useEffect } from "react";

function useFormattedTimestamp(timestamp) {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const date = new Date(timestamp);
    const now = new Date();

    // Calculate time components
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Format for time: "HH:MM"
    const timeString = `${hours}:${minutes}`;

    // Get today's date and yesterday's date for comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Determine the formatted time
    let formatted = "";
    if (date >= today) {
      formatted = timeString; // Today: Show time
    } else if (date >= yesterday) {
      formatted = "Yesterday"; // Yesterday
    } else {
      // Earlier than yesterday: Show date as "DD-MM-YYYY"
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      formatted = `${day}-${month}-${year}`;
    }

    setFormattedTime(formatted);
  }, [timestamp]); // Only depend on timestamp

  return formattedTime;
}

export default useFormattedTimestamp;

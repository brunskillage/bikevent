import { useState, useEffect } from "react";

export const useOnline = () => {
  const [isOnline, setOnline] = useState(false);

  const handleOnline = () => setOnline(true);
  const handleOffline = () => setOnline(false);

  useEffect(() => {
    document.addEventListener("online", handleOnline);
    document.addEventListener("offline", handleOffline);

    return () => {
      document.removeEventListener("online", handleOnline);
      document.removeEventListener("offline", handleOffline);
    };
  }, []);
};

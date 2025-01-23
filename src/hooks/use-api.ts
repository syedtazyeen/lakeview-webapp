import { useState, useEffect } from "react";

export function useApi<T>(apiCall: () => Promise<T>, call: boolean = true) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!call) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 150);
      }
    };

    fetchData();
  }, [apiCall]);

  return { data, isLoading, error };
}

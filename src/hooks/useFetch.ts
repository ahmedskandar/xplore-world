import { useEffect } from "react";

export const useFetch = <T>(
  url: string,
  headers: Headers,
  handleChange: (data: T) => void,
) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { method: "GET", headers });
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = (await response.json()) as T;
        handleChange(data);
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message);
        } else {
          throw e; // re-throw the error if it's not an instance of Error
        }
      }
    };

    void fetchData();
  }, [handleChange, headers, url]);
};

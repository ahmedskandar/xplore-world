import { useEffect, useState } from "react";

export const useFetch = <T>(url: string, headers: Headers) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function isDataEmpty(data: unknown): boolean {
    //Return true if data is a string or an array of length 0
    if (typeof data === "string" || Array.isArray(data)) {
      return data.length === 0;
    }
    //Return true if data, which is an object, is null or the object properties have no value
    if (typeof data === "object") {
      return data === null || Object.keys(data).length === 0;
    }
    //Return true if data is falsy in general
    return !data;
  }

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setError("");
        const response = await fetch(url, {
          method: "GET",
          headers,
          signal: controller.signal,
        });
        if (!response.ok) {
          return setError("Request failed");
        }
        const data = (await response.json()) as T;
        if (isDataEmpty(data)) {
         return setError("Empty data");
        }
        setData(data);
      } catch (e) {
        if (e instanceof Error && e.name !== "AbortError") setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchData();

    return () => controller.abort();
  }, [headers, url]);

  return { data, error, isLoading };
};

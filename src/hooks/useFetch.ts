import { useEffect, useState } from "react";

export const useFetch = <T>(url: string, headers: Headers) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
          setError("Request failed")
        }
        const data = (await response.json()) as T;
        setData(data);
      } catch (e) {
        if (e instanceof Error && e.name !== "AbortError") setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchData();

    return () => controller.abort()
  }, [headers, url]);

  return { data, error, isLoading };
};

import { useEffect, useState } from "react";

export const useFetch = <T>(
  url: string,
  headers: Headers,
  method: "POST" | "GET" = "GET",
  body?: object,
) => {
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
          method,
          headers,
          body: JSON.stringify(body),
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
  }, [headers, url, body, method]);

  return { data, error, isLoading };
};

// import { useEffect, useState, useCallback } from "react";

// export const useFetch = <T>(
//   url: string,
//   headers: Headers,
//   method: "POST" | "GET" = "GET",
//   body?: unknown,
//   timeout = 5000,
// ) => {
//   const [data, setData] = useState<T>();
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [retry, setRetry] = useState(false);

//   function isDataEmpty(data: unknown): boolean {
//     if (typeof data === "string" || Array.isArray(data)) {
//       return data.length === 0;
//     }
//     //Return true if data, which is an object, is null or the object properties have no value
//     if (typeof data === "object") {
//       return data === null || Object.keys(data).length === 0;
//     }
//     //Return true if data is falsy in general
//     return !data;
//   }

//   const fetchData = useCallback(async () => {
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), timeout);
//     try {
//       setError("");
//       setIsLoading(true);
//       const response = await fetch(url, {
//         method,
//         headers,
//         body: JSON.stringify(body),
//         signal: controller.signal,
//       });
//       if (!response.ok) {
//         throw new Error("Request failed");
//       }
//       const data = (await response.json()) as T;
//       if (isDataEmpty(data)) {
//         throw new Error("Empty data");
//       }
//       setData(data);
//     } catch (e) {
//       if (e instanceof Error && e.name !== "AbortError") setError(e.message);
//     } finally {
//       setIsLoading(false);
//       clearTimeout(timeoutId);
//     }
//     return () => controller.abort();
//   }, [headers, url, body, method, retry, timeout]);

//   useEffect(() => {
//     void fetchData();
//   }, [fetchData]);

//   return { data, error, isLoading, retry: () => setRetry(!retry) };
// };


//MOST REUSABLE
// import { useEffect, useState, useCallback } from "react";

// export const useFetch = <T>(
//   url: string,
//   headers: Headers,
//   method: "POST" | "GET" = "GET",
//   body?: unknown,
//   timeout = 5000,
//   setDataExternal?: React.Dispatch<React.SetStateAction<T | undefined>>,
// ) => {
//   const [dataInternal, setDataInternal] = useState<T>();
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [retry, setRetry] = useState(false);

//   const setData = setDataExternal || setDataInternal;

//   function isDataEmpty(data: unknown): boolean {
//     // Your existing code...
//   }

//   const fetchData = useCallback(async () => {
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), timeout);
//     try {
//       setError("");
//       setIsLoading(true);
//       const response = await fetch(url, {
//         method,
//         headers,
//         body: JSON.stringify(body),
//         signal: controller.signal,
//       });
//       if (!response.ok) {
//         throw new Error("Request failed");
//       }
//       const data = (await response.json()) as T;
//       if (isDataEmpty(data)) {
//         throw new Error("Empty data");
//       }
//       setData(data);
//     } catch (e) {
//       if (e instanceof Error && e.name !== "AbortError") setError(e.message);
//     } finally {
//       setIsLoading(false);
//       clearTimeout(timeoutId);
//     }
//     return () => controller.abort();
//   }, [headers, url, body, method, retry, timeout, setData]);

//   useEffect(() => {
//     void fetchData();
//   }, [fetchData]);

//   return {
//     data: dataInternal,
//     error,
//     isLoading,
//     retry: () => setRetry(!retry),
//   };
// };

import React, { useMemo, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { InputChangeEvent } from "../../lib/types";
import { apiKey2 } from "../../data/constants";

const Chat = () => {
  const [messages, setMessages] = useState([
    ["faBot", "Hey"],
  ]);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [bot, setBot] = useState("bot1");

  const handleInputChange = (event: InputChangeEvent) => {
    setUserInput(event.target.value);
  };

  const url = "https://lemurbot.p.rapidapi.com/chat";
  const headers = useMemo(() => {
    return new Headers({
      "content-type": "application/json",
      "X-RapidAPI-Key": apiKey2 ?? "",
      "X-RapidAPI-Host": "lemurbot.p.rapidapi.com",
    });
  }, []);

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
  //   useEffect(() => {
  //     if (error !== "Request failed") return;
  //     const controller = new AbortController();

  //     const userMsg2 =
  //     messages[messages.length - 1][0] === "faUser" &&
  //     messages[messages.length - 1][1] || "";
  //     const body2 = {
  //         query: userMsg2
  //     }

  //     const fetchData = async () => {
  //         try {
  //         setError("");
  //         const response2 = await fetch(url2, {
  //             method: "POST",
  //             body: JSON.stringify(body2),
  //             headers: headers2,
  //             signal: controller.signal,
  //         });
  //         console.log("error " + error)
  //         if (!response2.ok) {
  //           return setError("Api 2 has prob");
  //         }
  //         const data: unknown = await response2.json();
  //         if (isDataEmpty(data)) {
  //           return setError("Empty data");
  //         }
  //         setMessages([...messages, ["faBot", data.response]]);
  //       } catch (e) {
  //         if (e instanceof Error && e.name !== "AbortError") setError(e.message);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     void fetchData();

  //     return () => controller.abort();
  //   }, [error, headers2, messages]);

  useEffect(() => {
    setBot("bot1");
    const userMsg =
      messages[messages.length - 1][0] === "faUser" &&
      messages[messages.length - 1][1];

    const body = {
      bot: "dilly",
      client: "d531e3bd-b6c3-4f3f-bb58-a6632cbed5e2",
      message: userMsg,
    };

    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setError("");
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers,
          signal: controller.signal,
        });
        //eslint-disable-next-line
        const data = await response.json();
        if (isDataEmpty(data)) {
          return setError("Empty data");
        }
        //eslint-disable-next-line
        setMessages([...messages, ["faBot", data.data.conversation.output]]);
      } catch (e) {
        // if (e instanceof Error && e.name !== "AbortError") setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchData();

    return () => controller.abort();
  }, [headers, messages]);
  //   console.log(body.message)
  //   const body2 = useMemo(() => ({}), []);
  //   const body3 = useMemo(
  //     () => ({
  //       bot: "Travel Assistant",
  //       client: "94c15703-b7ea-4148-a38c-3ec0b995c1d5",
  //       message: "Hey",
  //     }),
  //     [],
  //   );

  // const { error, isLoading } = useFetch(url, headers, "POST", setMessages, body);

  //   console.log(data.data.conversation.output);
  //   console.log(error);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessages([...messages, ["faUser", userInput]]);
    setUserInput("");
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`absolute z-30 right-10 bottom-10  overflow-hidden rounded-md shadow-md transition-all duration-500 ${
        isOpen ? "max-h-screen w-[350px]" : "max-h-[3.9rem] w-[250px]"
      }`}
    >
      <header
        className={`flex w-full items-center justify-between rounded-t-md bg-gradient-to-b  p-3 text-white shadow-md ${
          bot === "bot1"
            ? "from-gray-900 to-gray-700"
            : bot === "bot2"
            ? "from-yellow-700 to-yellow-500"
            : "from-red-900 to-red-700"
        }`}
      >
        <div className="flex items-center gap-1">
          <img
            src="https://api.dicebear.com/6.x/personas/svg?seed=dilly&size=128"
            className="-mt-2 w-12"
          />
          <h4>Travel Assistance</h4>
        </div>
        <FontAwesomeIcon
          className={`cursor-pointer transition duration-300 ${
            isOpen && " rotate-180"
          }`}
          icon={faArrowUp}
          onClick={() => setIsOpen(!isOpen)}
        />
      </header>
      <div className="max-h-60 space-y-2 overflow-y-scroll break-words bg-gray-100 p-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 ${
              message[0] === "faUser" ? "justify-end bg-gray-200 pl-5" : "pr-5"
            }`}
          >
            {message[0] === "faUser" ? (
              <FontAwesomeIcon
                className="order-2 rounded-full border bg-green-400 p-2 text-lg"
                icon={faUser}
              />
            ) : (
              <img
                className="w-7"
                src="https://api.dicebear.com/6.x/personas/svg?seed=dilly&size=128"
                alt=""
              />
            )}

            <span className="overflow-auto">{message[1]}</span>
          </div>
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error {error}</p>}
      <form onSubmit={handleFormSubmit} className="bg-gray-100 p-3">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="w-full rounded-md border p-2"
          placeholder="Type your message..."
        />
      </form>
    </div>
  );
};

export default Chat;

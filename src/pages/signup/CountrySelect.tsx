import { useEffect, useMemo, useState } from "react";
import { NationalitySelect } from "../../lib/types";
import { apiKey } from "../../data/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const CountrySelect = ({ onChange, select, error }: NationalitySelect) => {
  if (!onChange) throw new Error("The onChange function should be defined");
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState<{
    value: string;
    key: string;
  }[] | null>(null);

  const url = "https://referential.p.rapidapi.com/v1/country";
  const headers = useMemo(() => {
    return new Headers({
      "X-RapidAPI-Key": apiKey ?? "",
      "X-RapidAPI-Host": "referential.p.rapidapi.com",
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers,
        });
        //eslint-disable-next-line
        const data: { value: string; key: string }[] = await response.json();
        setCountries(data);

        //eslint-disable-next-line
      } catch (e) {
        // if (e instanceof Error && e.name !== "AbortError") setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchData();
  }, [headers]);

  // const {
  //   data: countries,
  //   error: fetchError,
  //   isLoading,
  // } = useFetch<CountryDataType>(url, headers);

  return (
    <div className="space-y-2">
      <label htmlFor="select">Select your nationality:</label>
      {isLoading && (
        <div className="flex justify-center">
          <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
        </div>
      )}
      {!isLoading && (
        <select
          id="select"
          onChange={onChange}
          className={`input ${
            error && "border-red-500"
          }  focus:border-[#2ECC71] focus:shadow-md focus:outline-none`}
          value={select}
        >
          <option value="" disabled className="text-gray-400"></option>
          {countries?.sort((a, b) => a.value.localeCompare(b.value))
            .map((country) => (
              <option key={country.value} value={country.key}>
                {country.value}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

export default CountrySelect;

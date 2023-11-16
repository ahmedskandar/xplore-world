import { useEffect, useState } from "react";
import { CountryDataType, NationalitySelect } from "../../lib/types";
import { apiKey } from "../../data/constants";

const CountrySelect = ({ onChange, select, error }: NationalitySelect) => {
  if (!onChange) throw new Error("The onChange function should be defined");

  const [countries, setCountries] = useState<CountryDataType>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://referential.p.rapidapi.com/v1/country";
      const headers = new Headers();
      headers.append("X-RapidAPI-Key", apiKey ?? "");
      headers.append("X-RapidAPI-Host", "referential.p.rapidapi.com");

      try {
        const response = await fetch(url, { method: "GET", headers });
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = (await response.json()) as CountryDataType;
        setCountries(data);
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message);
        } else {
          throw e; // re-throw the error if it's not an instance of Error
        }
      }
    };

    void fetchData();
  }, []);

  return (
    <div className="space-y-2">
      <label htmlFor="">Select your nationality:</label>
      <select
        onChange={onChange}
        className={`input ${
          error && "border-red-500"
        }  focus:border-[#2ECC71] focus:shadow-md focus:outline-none`}
        value={select}
      >
        <option value="" disabled className="text-gray-400"></option>
        {countries
          .sort((a, b) => a.value.localeCompare(b.value))
          .map((country) => (
            <option key={country.value} value={country.key}>
              {country.value}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CountrySelect;

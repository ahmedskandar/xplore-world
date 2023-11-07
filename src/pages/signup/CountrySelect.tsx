import { useState, useCallback, useMemo } from "react";
import { CountryDataType, NationalitySelect } from "../../lib/types";
import { apiKey } from "../../data/constants";
import { useFetch } from "../../hooks/useFetch";

const CountrySelect = ({ onChange, select, error }: NationalitySelect) => {
  if (!onChange) throw new Error("The onChange function should be defined");

  const [countries, setCountries] = useState<CountryDataType>([]);

  const handleCountryChange = useCallback((countriesData: CountryDataType) => {
    setCountries(countriesData);
  }, []);

  const url = "https://referential.p.rapidapi.com/v1/country";
  const headers = useMemo(() => {
    return new Headers({
      "X-RapidAPI-Key": apiKey ?? "",
      "X-RapidAPI-Host": "referential.p.rapidapi.com",
    });
  }, []);
  useFetch(url, headers, handleCountryChange);

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

import { useMemo } from "react";
import { CountryDataType, NationalitySelect } from "../../lib/types";
import { apiKey } from "../../data/constants";
import { useFetch } from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ErrorText from "../../components/ui/ErrorText";

const CountrySelect = ({ onChange, select, error }: NationalitySelect) => {
  if (!onChange) throw new Error("The onChange function should be defined");

  const url = "https://referential.p.rapidapi.com/v1/country";
  const headers = useMemo(() => {
    return new Headers({
      "X-RapidAPI-Key": apiKey ?? "",
      "X-RapidAPI-Host": "referential.p.rapidapi.com",
    });
  }, []);

  const {
    data: countries,
    error: fetchError,
    isLoading,
  } = useFetch<CountryDataType>(url, headers);

  return (
    <div className="space-y-2">
      <label htmlFor="">Select your nationality:</label>
      {fetchError && <ErrorText>{fetchError}</ErrorText>}
      {isLoading && (
        <div className="flex justify-center">
          <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
        </div>
      )}
      {!isLoading && !fetchError && (
        <select
          onChange={onChange}
          className={`input ${
            error && "border-red-500"
          }  focus:border-[#2ECC71] focus:shadow-md focus:outline-none`}
          value={select}
        >
          <option value="" disabled className="text-gray-400"></option>
          {countries
            ?.sort((a, b) => a.value.localeCompare(b.value))
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

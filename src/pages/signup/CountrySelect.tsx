import { NationalitySelect } from "../../lib/types";

const CountrySelect = ({ onChange, select, error }: NationalitySelect) => {
    if (!onChange) throw new Error("The onChange function should be defined");
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
        <option value="CA">Canada</option>
        <option value="KE">Kenya</option>
        <option value="EG">Egypt</option>
      </select>
    </div>
  );
};

export default CountrySelect;

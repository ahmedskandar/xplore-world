import { useId } from "react";
import { InputType } from "../../lib/types";

const Input = ({ label, onChange, type }: InputType) => {
  //Stops app execution if onChange is not defined. This check is not done in TypeScript to make the
  //type reusable as possible
  const id = useId()
  if (!onChange) throw new Error("The onChange function should be defined");
  return (
    <div className="space-y-2">
      <label htmlFor={id}>{label}</label>
      <input
      id={id}
      type={type}
        onChange={onChange}
        className="w-full rounded-sm border border-[#cecece] p-2 focus:shadow-md focus:outline-none focus:border-[#2ECC71]"
      />
    </div>
  );
};

export default Input;

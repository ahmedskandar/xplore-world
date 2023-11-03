import { useState } from "react";
import { Link } from "react-router-dom";

const LoginOptions = () => {
     const [isChecked, setIsChecked] = useState(false);

     const handleCheckboxChange = () => {
       setIsChecked(!isChecked);
     };
  return (
    <div className="flex justify-between">
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          className="accent-[#009ACD]"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="cursor-pointer">Remember me</span>
      </label>
      <Link to={"/reset"}>Forgot password?</Link>
    </div>
  );
}

export default LoginOptions
import { Link } from "react-router-dom";
import { LoginOptionsType } from "../../lib/types";

const LoginOptions = ({ onCheckboxChange }: LoginOptionsType) => {
  return (
    <div className="flex justify-between">
      <label htmlFor="checkbox" className="flex items-center gap-1">
        <input
          id="checkbox"
          type="checkbox"
          className="cursor-pointer accent-[#009ACD]"
          onChange={onCheckboxChange}
        />
        <span className="cursor-pointer">Remember me</span>
      </label>
      <Link className="hover:underline" to={"/reset"}>
        Forgot password?
      </Link>
    </div>
  );
};

export default LoginOptions;

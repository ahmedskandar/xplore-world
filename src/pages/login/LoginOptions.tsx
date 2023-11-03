import { Link } from "react-router-dom";
import { LoginOptionsType } from "../../lib/types";

const LoginOptions = ({onCheckboxChange}: LoginOptionsType) => {
  return (
    <div className="mb-3 flex justify-between">
      <label className="flex items-center gap-1">
        <input
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

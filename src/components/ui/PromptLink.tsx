import { Link } from "react-router-dom";
import { PromptLinkType } from "../../lib/types";

const PromptLink = ({ type }: PromptLinkType) => {
  return type === "login" ? (
    <p>
      Don&apos;t have an account? Click{" "}
      <Link className="underline" to={"/signup"}>
        here
      </Link>{" "}
      to sign up
    </p>
  ) : (
    <p>
      Already have an account? Click{" "}
      <Link className=" underline" to={"/login"}>
        here
      </Link>{" "}
      to login
    </p>
  );
};

export default PromptLink;

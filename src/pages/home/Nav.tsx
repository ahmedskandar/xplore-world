import { NavLink } from "react-router-dom";
import LinkButton from "../../components/ui/LinkButton";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons/faPowerOff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = () => {
  return (
    <nav className="mt-5 space-x-10">
      <NavLink className="text-white hover:font-semibold" to={"signup"}>
        Sign up
      </NavLink>
      <LinkButton to={"login"}>
        <span className="hover-effect">Login</span>
        <FontAwesomeIcon className="hover-effect" icon={faPowerOff} />
      </LinkButton>
    </nav>
  );
}

export default Nav
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="mt-5 space-x-10">
      <NavLink to={'login'}>Sign up</NavLink>
      <NavLink to={'signup'}>Login</NavLink>
    </nav>
  );
}

export default Nav
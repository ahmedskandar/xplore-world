import Logo from "../../components/ui/Logo";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="relative flex flex-col items-center p-5 sm:flex-row sm:items-start sm:justify-between sm:p-10">
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;

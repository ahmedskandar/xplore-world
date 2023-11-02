import Logo from "../../components/ui/Logo";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="relative flex flex-col items-center p-12 sm:items-start sm:flex-row sm:justify-between">
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;

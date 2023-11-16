import { Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="basis-1/3 bg-gradient-primary">
      <Outlet />
    </div>
  );
};

export default Sidebar;

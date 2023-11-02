import { LinkType, ChildrenPropsType } from "../../lib/types";

import { Link } from "react-router-dom";

//This component renders a button or a link depending on the props set
const LinkButton = ({ to, children }: LinkType & ChildrenPropsType) => {
  return <Link to={to}>{children}</Link>;
};

export default LinkButton;

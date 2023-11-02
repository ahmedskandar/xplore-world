import { LinkType, ChildrenPropsType } from "../../lib/types";

import { Link } from "react-router-dom";

const LinkButton = ({ to, children }: LinkType & ChildrenPropsType) => {
  return <Link to={to}>{children}</Link>;
};

export default LinkButton;

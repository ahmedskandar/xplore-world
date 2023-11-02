import { LinkType, ChildrenPropsType } from "../../lib/types";

import { Link } from "react-router-dom";

const LinkButton = ({ to, children }: LinkType & ChildrenPropsType) => {
  return (
    <Link className={"button-primary group space-x-2"} to={to}>
      {children}
    </Link>
  );
};

export default LinkButton;

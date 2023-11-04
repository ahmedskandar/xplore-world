import { ChildrenPropsType } from "../../lib/types";

const PageLayout = ({ children }: ChildrenPropsType) => {
  return <div className="flex h-[100svh] flex-col md:flex-row">{children}</div>;
};

export default PageLayout;

import { ChildrenPropsType } from "../../lib/types";

const HeadingText = ({ children }: ChildrenPropsType) => {
  return (
    <h2 className="inline bg-gradient-primary bg-clip-text text-2xl font-bold text-transparent md:text-3xl xl:text-4xl">
      {children}
    </h2>
  );
};

export default HeadingText;

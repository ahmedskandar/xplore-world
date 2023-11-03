import { ButtonType, ChildrenPropsType } from "../../lib/types";

const Button = ({
  type,
  onClick,
  children,
}: ButtonType & ChildrenPropsType) => {
  if (!onClick) throw new Error("The onClick prop is not passed");
  return (
    <button
      className={"button-primary group space-x-2"}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

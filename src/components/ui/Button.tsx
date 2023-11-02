import { ButtonType, ChildrenPropsType } from "../../lib/types";

const Button = ({
  type,
  onClick,
  children,
}: ButtonType & ChildrenPropsType) => {
  return (
    <button className={"bg-gradient-primary"} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

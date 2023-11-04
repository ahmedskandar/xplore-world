import { ChildrenPropsType } from "../../lib/types";

const Form = ({children}: ChildrenPropsType) => {
  return (
    <form className="mt-8 flex flex-col gap-8">
      {children}
    </form>
  );
}

export default Form
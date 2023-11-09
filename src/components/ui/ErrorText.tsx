import { ChildrenPropsType } from "../../lib/types"

const ErrorText = ({children}: ChildrenPropsType) => {
  return (
    <p className="text-red-500 font-serif">{children}</p>
  )
}

export default ErrorText
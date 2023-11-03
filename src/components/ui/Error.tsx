import { ChildrenPropsType } from "../../lib/types"

const Error = ({children}: ChildrenPropsType) => {
  return (
    <p className="text-red-500 font-serif">{children}</p>
  )
}

export default Error
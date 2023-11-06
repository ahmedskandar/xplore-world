import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ChildrenPropsType } from "../lib/types";

const LogInRedirect = ({ children }: ChildrenPropsType) => {
  const {
    state: { isLoggedIn },
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/app/travels");
  }, [isLoggedIn, navigate]);

  return children;
};

export default LogInRedirect;

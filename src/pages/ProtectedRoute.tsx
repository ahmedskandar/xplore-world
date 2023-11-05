import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ChildrenPropsType } from "../lib/types";

const ProtectedRoute = ({ children }: ChildrenPropsType) => {
  const {
    state: { isLoggedIn },
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  return children;
};

export default ProtectedRoute;

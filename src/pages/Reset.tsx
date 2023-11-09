import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/ui/Button";
import ErrorText from "../components/ui/ErrorText";
import Form from "../components/ui/Form";
import Input from "../components/ui/Input";
import Logo from "../components/ui/Logo";
import { useLayoutEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  ACTION_TYPE,
  FormSubmissionEvent,
  InputChangeEvent,
} from "../lib/types";
import { validateEmail, validatePassword } from "../utils/ValidationUtil";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import HeadingText from "../components/ui/HeadingText";

const Reset = () => {
  const {
    state: { registrationError, users },
    dispatch,
  } = useAuth();
console.log(users)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const initialErrorState = { email: "", password: "" };
  const [error, setError] = useState(initialErrorState);

  const emailInputChangeHandler = (e: InputChangeEvent) => {
    dispatch({ type: "RESET_ERROR" });
    error.email && setError(initialErrorState);
    setEmail(e.target.value);
  };
  const passwordInputChangeHandler = (e: InputChangeEvent) => {
    error.password && setError(initialErrorState);
    setPassword(e.target.value);
  };

  const handleFormSubmission = (e: FormSubmissionEvent) => {
    e.preventDefault();

    if (!validateEmail(email, setError)) return;
    if (!validatePassword(password, setError)) return;

    const USER_INPUT = { email, password };

    dispatch({ type: ACTION_TYPE.USER_RESET, payload: USER_INPUT });
  };

  //Resets previous page errors when this page loads
  useLayoutEffect(() => {
    dispatch({ type: ACTION_TYPE.RESET_ERROR });
  }, [dispatch, users]);

  return (
    <div className="mt-14 flex flex-col items-center">
      <div className="mb-10">
        <Logo />
      </div>
        <HeadingText>Reset Password</HeadingText>
        <Form>
          <Input
            error={error.email || registrationError}
            type="email"
            label="Enter your email:"
            onChange={emailInputChangeHandler}
          />
          <Input
            error={error.password}
            label="Enter new password:"
            onChange={passwordInputChangeHandler}
          />
          {/* <Input
          error={error.password || registrationError}
          label="Confirm new password:"
          onChange={passwordInputChangeHandler}
        /> */}
          {(error.email || error.password || registrationError) && (
            <ErrorText>
              {error.email || error.password || registrationError}
            </ErrorText>
          )}
          <Button onClick={handleFormSubmission}>
            <span className="hover-effect">RESET</span>
            <FontAwesomeIcon className="hover-effect" icon={faRefresh} />
          </Button>
        </Form>
      </div>
  );
};

export default Reset;

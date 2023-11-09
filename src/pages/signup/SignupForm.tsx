import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/ui/Button";
import Form from "../../components/ui/Form";
import HeadingText from "../../components/ui/HeadingText";
import Input from "../../components/ui/Input";
import Logo from "../../components/ui/Logo";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import PromptLink from "../../components/ui/PromptLink";
import CountrySelect from "./CountrySelect";
import {
  ACTION_TYPE,
  FormSubmissionEvent,
  InputChangeEvent,
  SelectChangeEvent,
} from "../../lib/types";
import {
  validateEmail,
  validatePassword,
  validateSelect,
} from "../../utils/ValidationUtil";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ErrorText from "../../components/ui/ErrorText";

const SignupForm = () => {
  const navigate = useNavigate();

  const {
    state: { registrationError },
    dispatch,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [select, setSelect] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const initialErrorState = { email: "", password: "", select: "" };
  const [error, setError] = useState(initialErrorState);

  const emailInputChangeHandler = (e: InputChangeEvent) => {
    if (registrationError) {
      setIsFormSubmitted(false);
      dispatch({ type: "RESET_ERROR" });
    }
    error.email && setError(initialErrorState);
    setEmail(e.target.value);
  };
  const passwordInputChangeHandler = (e: InputChangeEvent) => {
    error.password && setError((prevState) => ({ ...prevState, password: "" }));
    setPassword(e.target.value);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    error.select && setError((prevState) => ({ ...prevState, select: "" }));
    setSelect(e.target.value);
  };

  const handleFormSubmission = (e: FormSubmissionEvent) => {
    e.preventDefault();

    if (!validateEmail(email, setError)) return;
    if (!validatePassword(password, setError)) return;
    if (!validateSelect(select, setError)) return;

    const userInput = {
      email,
      password,
      nationality: select,
    };

    dispatch({ type: ACTION_TYPE.USER_SIGNUP, payload: userInput });
    setIsFormSubmitted(true);

    // Check for registration error after dispatching the action

    // Registration was successful, navigate or perform other actions
  };

  useEffect(() => {
    // Check for registration error after the state has updated
    if (registrationError) {
      return;
    }
    if (isFormSubmitted) navigate("/login");
  }, [registrationError, navigate, isFormSubmitted]);

  useLayoutEffect(() => {
    dispatch({ type: ACTION_TYPE.RESET_ERROR });
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-md px-8 py-8 md:basis-1/2">
      <div className="mb-10 flex justify-center">
        <Logo />
      </div>
      <HeadingText>Sign up</HeadingText>
      <Form>
        <Input
          error={error.email || registrationError}
          type="email"
          label="Enter your email:"
          onChange={emailInputChangeHandler}
        />
        <Input
          error={error.password}
          label="Enter your password:"
          onChange={passwordInputChangeHandler}
        />
        <CountrySelect
          error={error.select}
          onChange={handleSelectChange}
          select={select}
        />
        {(error.email ||
          error.password ||
          error.select ||
          registrationError) && (
          <ErrorText>
            {error.email || error.password || error.select || registrationError}
          </ErrorText>
        )}
        <Button onClick={handleFormSubmission}>
          <span className="hover-effect">Sign up</span>
          <FontAwesomeIcon className="hover-effect" icon={faSignIn} />
        </Button>
        <PromptLink type="signup" />
      </Form>
    </div>
  );
};

export default SignupForm;

import { useState } from "react";
import Button from "../../components/ui/Button";
import Logo from "../../components/ui/Logo";
import LoginOptions from "./LoginOptions";
import PromptLink from "../../components/ui/PromptLink";
import HeadingText from "../../components/ui/HeadingText";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../components/ui/Input";
import { FormSubmissionEvent, InputChangeEvent } from "../../lib/types";
import Error from "../../components/ui/Error";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const initialErrorState = { email: "", password: "" };
  const [error, setError] = useState(initialErrorState);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const emailInputChangeHandler = (e: InputChangeEvent) => {
    error.email && setError(initialErrorState);
    setEmail(e.target.value);
  };
  const passwordInputChangeHandler = (e: InputChangeEvent) => {
    error.password && setError(initialErrorState);
    setPassword(e.target.value);
  };

  const testInput = { email: "itsahmedlukman@gmail.com", password: "12345678" };

  const isEmailValid = (): boolean => {
    const regex = /^.+@.+\..+$/; // Regular expression to check for "@" followed by some text and then a dot and more text
    return regex.test(email);
  };

  const handleFormSubmission = (e: FormSubmissionEvent) => {
    e.preventDefault();
    if (!email || email.trim().length === 0)
      return setError((prevState) => ({
        ...prevState,
        email: "Please fill in the email field",
      }));
    if (!isEmailValid())
      return setError((prevState) => ({
        ...prevState,
        email: "Please fill in a correct email",
      }));
    if (!password || password.trim().length === 0)
      return setError((prevState) => ({
        ...prevState,
        password: "Please fill in the password field",
      }));
    if (password.length < 8)
      return setError((prevState) => ({
        ...prevState,
        password: "Password length should be greater than 8",
      }));

    const input = { email, password, isChecked };

    if (
      input.email !== testInput.email ||
      input.password !== testInput.password
    )
      return setError((prevState) => ({
        ...prevState,
        email: "Invalid credentials, please try again",
        password: "Invalid credentials, please try again",
      }));

    navigate("/app/travels");
  };
  // px-36 py-10sm
  return (
    <div className="order-2 px-8 py-8 mx-auto max-w-md md:order-1 md:basis-1/2">
      <div className="mb-10 flex justify-center">
        <Logo />
      </div>
      <HeadingText>Login</HeadingText>
      <form className="mt-8 flex flex-col gap-8">
        <Input
          type="email"
          label="Enter your email:"
          onChange={emailInputChangeHandler}
        />
        <Input
          label="Enter your password:"
          onChange={passwordInputChangeHandler}
        />
        <LoginOptions onCheckboxChange={handleCheckboxChange} />
        {(error.email || error.password) && (
          <Error>{error.email || error.password}</Error>
        )}
        <Button onClick={handleFormSubmission}>
          <span className="hover-effect">Login</span>
          <FontAwesomeIcon className="hover-effect" icon={faPowerOff} />
        </Button>
        <PromptLink type="login" />
      </form>
    </div>
  );
};

export default LoginForm;

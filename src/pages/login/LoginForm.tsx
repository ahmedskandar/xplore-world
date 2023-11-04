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
import Form from "../../components/ui/Form";
import { validateEmail, validatePassword } from "../../utils/ValidationUtil";

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

  const handleFormSubmission = (e: FormSubmissionEvent) => {
    e.preventDefault();

    if (!validateEmail(email, setError)) return;
    if (!validatePassword(password, setError)) return;

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
    <div className="order-2 mx-auto max-w-md px-8 py-8 md:order-1 md:basis-1/2">
      <div className="mb-10 flex justify-center">
        <Logo />
      </div>
      <HeadingText>Login</HeadingText>
      <Form>
        <Input
          error={error.email}
          type="email"
          label="Enter your email:"
          onChange={emailInputChangeHandler}
        />
        <Input
          error={error.password}
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
      </Form>
    </div>
  );
};

export default LoginForm;

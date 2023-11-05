import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/ui/Button";
import Form from "../../components/ui/Form";
import HeadingText from "../../components/ui/HeadingText";
import Input from "../../components/ui/Input";
import Logo from "../../components/ui/Logo";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import PromptLink from "../../components/ui/PromptLink";
import NationalitySelect from "./NationalitySelect";
import { FormSubmissionEvent, InputChangeEvent, SelectChangeEvent } from "../../lib/types";
import {
  validateEmail,
  validatePassword,
  validateSelect,
} from "../../utils/ValidationUtil";
import { useState } from "react";
import Error from "../../components/ui/Error";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [select, setSelect] = useState("");

  const initialErrorState = { email: "", password: "", select: "" };
  const [error, setError] = useState(initialErrorState);

  const emailInputChangeHandler = (e: InputChangeEvent) => {
    error.email && setError(initialErrorState);
    setEmail(e.target.value);
  };
  const passwordInputChangeHandler = (e: InputChangeEvent) => {
    error.password && setError(initialErrorState);
    setPassword(e.target.value);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    error.select && setError(initialErrorState);
    setSelect(e.target.value);
  };

  const handleFormSubmission = (e: FormSubmissionEvent) => {
    e.preventDefault();

    if (!validateEmail(email, setError)) return;
    if (!validatePassword(password, setError)) return;
    if (!validateSelect(select, setError)) return;
    console.log({ select, email, password });
  };

  return (
    <div className="mx-auto max-w-md px-8 py-8 md:basis-1/2">
      <div className="mb-10 flex justify-center">
        <Logo />
      </div>
      <HeadingText>Sign up</HeadingText>
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
        <NationalitySelect
          error={error.select}
          onChange={handleSelectChange}
          select={select}
        />
        {(error.email || error.password || error.select) && (
          <Error>{error.email || error.password || error.select}</Error>
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

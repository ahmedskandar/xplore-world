import { Dispatch, SetStateAction } from "react";

export const validateEmail = <T>(
  email: string,
  setError: Dispatch<SetStateAction<T>>,
) => {
  const isEmailValid = (): boolean => {
    const regex = /^.+@.+\..+$/; // Regular expression to check for "@" followed by some text and then a dot and more text
    return regex.test(email);
  };
  if (!email || email.trim().length === 0)
    return setError((prevState) => ({
      ...prevState,
      email: "Please fill in the email field",
    }));
  if (!isEmailValid())
    return setError((prevState) => ({
      ...prevState,
      password: "",
      email: "Please fill in a correct email",
    }));
};

export const validatePassword = <T>(
  password: string,
  setError: Dispatch<SetStateAction<T>>,
) => {
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
};
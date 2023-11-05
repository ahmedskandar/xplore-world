import { Dispatch, SetStateAction } from "react";

//****If any future erros present, try making the fn async because setState fn is async */
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
      select: "", //When email is right, pasword is right, select is wrong, and then password and select are wrong, only the email be highlighted in red not all
      password: "",
      email: "Please fill in a correct email",
    }));

  return true; //If it passes all checks
};

export const validatePassword = <T>(
  password: string,
  setError: Dispatch<SetStateAction<T>>,
) => {
  if (!password || password.trim().length === 0)
    return setError((prevState) => ({
      ...prevState,
      select: "", //When password is right and select is wrong, then password is wrong, on highlight the password and not select and password
      password: "Please fill in the password field",
    }));
  if (password.trim().length < 8)
    return setError((prevState) => ({
      ...prevState,
      select: "", //When password is right and select is wrong, then password is wrong, on highlight the password and not select and password
      password: "Password length should be greater than 8",
    }));

  return true; //If it passes all checks
};

export const validateSelect = <T>(
  select: string,
  setError: Dispatch<SetStateAction<T>>,
) => {
  if (!select)
    return setError((prevState) => ({
      ...prevState,
      select: "Please select your nationality",
    }));

  return true;
};

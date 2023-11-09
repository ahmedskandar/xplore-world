import { Link } from "react-router-dom";

export type ChildrenPropsType = {
  children: React.ReactNode;
};

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;

export type FormSubmissionEvent = React.MouseEvent<
  HTMLButtonElement,
  MouseEvent
>;

export type LinkType = React.ComponentPropsWithoutRef<typeof Link>;
export type ButtonType = React.ComponentPropsWithoutRef<"button">;
export type SelectType = React.ComponentPropsWithoutRef<"select">;

export type InputType = React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  error: string;
};

export type PromptLinkType = { type: "login" | "signup" };

export type NationalitySelect = SelectType & {
  select: string;
  error: string;
};

export type LoginOptionsType = { onCheckboxChange: () => void };

//CONTEXT AND REDUCER TYPES

export type DispatchType<T> = React.Dispatch<T>;

export type DispatchActionType = {
  type: string;
  payload?: string | number | object;
};

export type Usertype = {
  email: string;
  password: string;
  nationality: string;
};

export type AuthState = {
  users: Usertype[];
  user: Usertype | null;
  isLoggedIn: boolean;
  registrationError: string
};

export type AuthContextType = {
  state: AuthState;
  dispatch: DispatchType<AuthAction>;
};

export type AuthAction =
  | { type: "SIGN_UP"; payload: Usertype }
  | { type: "LOGIN"; payload: Omit<Usertype, "nationality"> }
  | { type: "LOGOUT" }
  | { type: "RESET_ERROR"}
  | {type: "USER_RESET", payload: {email: string, password: string}}

export enum ACTION_TYPE {
  USER_SIGNUP = "SIGN_UP",
  USER_LOGIN = "LOGIN",
  USER_LOGOUT = "LOGOUT",
  RESET_ERROR = "RESET_ERROR",
  USER_RESET = "USER_RESET"

}

export type CountryDataType = {
  value: string,
  key: string
}[]
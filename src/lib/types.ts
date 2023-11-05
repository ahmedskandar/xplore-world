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
  select: string
  error: string
}

export type LoginOptionsType = { onCheckboxChange: () => void };

import { Link } from "react-router-dom";

export type ChildrenPropsType = {
  children: React.ReactNode;
};

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type LinkType = React.ComponentPropsWithoutRef<typeof Link>;

export type ButtonType = React.ComponentPropsWithoutRef<"button">;

export type PromptLinkType = { type: "login" | "signup" };

export type InputType = React.ComponentPropsWithoutRef<"input"> & {
  label: string;
};

export type LoginOptionsType = {onCheckboxChange: () => void}
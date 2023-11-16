import { createContext, useReducer } from "react";
import {
  ACTION_TYPE,
  AuthAction,
  AuthContextType,
  AuthState,
  ChildrenPropsType,
  Usertype,
} from "../lib/types";

// Sample array of users
const users: Usertype[] = [
  { email: "user1@example.com", password: "password1", nationality: "CA" },
  { email: "user2@example.com", password: "password2", nationality: "UK" },
  { email: "itsahmedlukman@gmail.com", password: "Mamatash@2003", nationality: "KE" },
  // Add more users as needed
];

// Initial State of the Auth reducer
const initialState: AuthState = {
  users,
  user: null,
  isLoggedIn: false,
  registrationError: "",
};

const authReducer = (state: AuthState, action: AuthAction) => {
  let userAlreadyRegistered;
  switch (action.type) {
    case ACTION_TYPE.USER_SIGNUP:
      // Check if the user is already registered
      userAlreadyRegistered = state.users.some(
        (user) => user.email === action.payload.email,
      );
      //This condition works as expected
      if (userAlreadyRegistered) {
        return {
          ...state,
          registrationError:
            "Email already registered, please use a different email.",
        };
      } else {
        return {
          ...state,
          users: [...state.users, action.payload],
          registrationError: "", // Clear any previous registration error
        };
      }
    case ACTION_TYPE.RESET_ERROR:
      return {
        ...state,
        registrationError: "", // Clear any previous registration error
      };

    case ACTION_TYPE.USER_RESET:
      userAlreadyRegistered = state.users.some(user => user.email === action.payload.email)
      if(!userAlreadyRegistered) {
        return {
          ...state,
          registrationError: "Email not found, please try again"
        }
      }
      return {
        ...state,
        users: state.users.map((user) =>
          user.email === action.payload.email
            ? { ...user, password: action.payload.password }
            : user,
        ),
        registrationError: ""
      };

    case ACTION_TYPE.USER_LOGIN:
      userAlreadyRegistered = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password,
      );

      if (userAlreadyRegistered)
        return {
          ...state,
          isLoggedIn: true,
          user: userAlreadyRegistered,
          registrationError: "",
        };
      else {
        return {
          ...state,
          registrationError: "Invalid credentials, please try again",
        };
      }

    default:
      throw new Error("Uknown action");
  }
};

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => {
    throw new Error(
      "Dispatch function cannot be called outside of AuthProvider",
    );
  },
});

export const AuthProvider = ({ children }: ChildrenPropsType) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

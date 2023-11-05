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
  { email: "user1@example.com", password: "password1", nationality: "US" },
  { email: "user2@example.com", password: "password2", nationality: "UK" },
  // Add more users as needed
];

// Initial State of the Auth reducer
const initialState: AuthState = {
  users: users,
  user: null,
  isLoggedIn: false,
  registrationError: "",
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  let userAlreadyRegistered;
  switch (action.type) {
    case ACTION_TYPE.USER_SIGNUP:
      userAlreadyRegistered = state.users.find(
        (user) => user.email === action.payload.email,
      );
      if (userAlreadyRegistered) {
        return {
          ...state,
          registrationError:
            "Email is already registered. Please use a different email.",
        };
      }
      return {
        ...state,
        users: [...state.users, action.payload],
        registrationError: "", // Clear any previous registration error
      };
    // Handle other action cases here
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: ChildrenPropsType) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// import { createContext, useContext } from "react";
// import { ChildrenPropsType } from "../lib/types";

// const AuthContext = createContext()

// const AuthProvider = ({children}: ChildrenPropsType) => {
//     return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
// }

// const useAuth = () => useContext(AuthContext)

// export {AuthProvider, useAuth}

//  case "SIGN_UP":
//     // Add a new user to the array
//     return {
//       ...state,
//       users: [...state.users, action.payload],
//     };
//   case "LOGIN":
//     // Check if the user exists in the array
//     const { email, password } = action.payload;
//     user = users.find((u) => u.email === email && u.password === password);
//     return {
//       ...state,
//       user: user || null,
//       isLoggedIn: !!user,
//     };
//   case "LOGOUT":
//     return {
//       ...state,
//       user: null,
//       isLoggedIn: false,
//     };
//   default:
//     return state;

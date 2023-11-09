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
  // Add more users as needed
];

// Initial State of the Auth reducer
const initialState: AuthState = {
  users,
  user: null,
  isLoggedIn: false,
  registrationError: "",
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  let userAlreadyRegistered;
  switch (action.type) {
    case ACTION_TYPE.USER_SIGNUP:
      // Check if the user is already registered
      userAlreadyRegistered = state.users.some(
        (user) => user.email === action.payload.email,
      );

      //    userAlreadyRegistered
      //     ?  alert("Error: user has already reg") : alert("New user Proceed")

      //This condition works as expected
      //   return userAlreadyRegistered
      //     ? {
      //         ...state,
      //         registrationError:
      //           "Email is already registered. Please use a different email.",
      //       }
      //     : {
      //         ...state,
      //         users: [...state.users, action.payload],
      //         registrationError: "", // Clear any previous registration error
      //       };

      //This condition works as expected
      if (userAlreadyRegistered) {
        // alert("User has already registered");
        return {
          ...state,
          registrationError:
            "Email already registered, please use a different email.",
        };
      } else {
        // alert("New user proceed");
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

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import LogInRedirect from "./pages/LogInRedirect";
import Reset from "./pages/Reset";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <LogInRedirect>
                  <Home />
                </LogInRedirect>
              }
            />
            <Route
              path="login"
              element={
                <LogInRedirect>
                  <Login />
                </LogInRedirect>
              }
            />
            <Route
              path="signup"
              element={
                <LogInRedirect>
                  <Signup />
                </LogInRedirect>
              }
            />
            <Route
              path="reset"
              element={
                <LogInRedirect>
                  <Reset />
                </LogInRedirect>
              }
            />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <p>WELCOME TO THE TRAVEL APP</p>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to={"travels"} replace />} />
              <Route path="form" element={<></>} />
              <Route path="travels" element={<></>} />
            </Route>
            <Route path="*" element={<></>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

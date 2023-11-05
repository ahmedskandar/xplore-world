import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
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

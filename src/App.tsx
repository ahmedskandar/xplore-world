import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<></>} />
          <Route path="signup" element={<></>} />
          <Route path="app" element={<></>}>
            <Route index element={<Navigate to={"travels"} replace />} />
            <Route path="form" element={<></>} />
            <Route path="travels" element={<></>} />
          </Route>
          <Route path="*" element={<></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

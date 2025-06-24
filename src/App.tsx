import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./hoc/ProtectedRoute";

import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import HomePage from "./pages/home";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes wrapped in ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

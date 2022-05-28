import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { LoadingSpinner } from "./components/spinner/Spinner";
import { GlobalContext } from "./context/GlobalContext";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <GlobalContext.Provider value={{ loading, setLoading }}>
      <Router>
        <LoadingSpinner loading={loading} />
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;

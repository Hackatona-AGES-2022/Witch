import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { LoadingSpinner } from "./components/spinner/Spinner";
import { GlobalContext, User } from "./context/GlobalContext";
import { Home } from "./pages/home/Home";
import { IdentityConfirmation } from "./pages/identity-confirmation/IdentityConfirmation";
import { Info } from "./pages/info/Info";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Report } from "./pages/reports/Report";
import { ProtectedRoute } from "./ProtectedRoute";

const customTheme = createTheme({
  palette: {
    primary: {
      light: "#112233",
      main: "#ffc0cb",
      dark: "#646464",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fffff",
      main: "#FD8087",
      dark: "#646464",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif", "Monospace"].join(","),
  },
});

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as User);

  return (
    <ThemeProvider theme={customTheme}>
      <GlobalContext.Provider value={{ loading, setLoading, user, setUser }}>
        <Router>
          <LoadingSpinner loading={loading} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route
              path="/confirmar-identidade"
              element={<IdentityConfirmation />}
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/relato"
              element={
                <ProtectedRoute>
                  <Report />
                </ProtectedRoute>
              }
            />
            <Route
              path="/info"
              element={
                <ProtectedRoute>
                  <Info />
                </ProtectedRoute>
              }
            />

            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}

export default App;

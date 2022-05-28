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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Report } from "./pages/reports/Report";
import { Info } from "./pages/info/Info";

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

  return (
    <ThemeProvider theme={customTheme}>
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
            <Route path="/relato" element={<Report />} />
            <Route path="/info" element={<Info />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}

export default App;

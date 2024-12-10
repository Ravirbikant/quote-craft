import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import { getToken, removeToken } from "./utils/api";
import QuotesListPage from "./components/QuotesListPage";
import QuoteCreationPage from "./components/QuoteCreationPage";

const App = () => {
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    setToken(getToken());
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/quotes" /> : <LoginPage onLogin={setToken} />
          }
        />
        <Route
          path="/quotes"
          element={
            token ? <QuotesListPage onLogout={setToken} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/create-quote"
          element={
            token ? (
              <QuoteCreationPage onLogout={setToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { getToken } from "./utils/api";
import QuotesListPage from "./components/quote-list/QuotesListPage";
import LoginPage from "./components/login/LoginPage";
import QuoteCreationPage from "./components/quote-creation/QuoteCreationPage";

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

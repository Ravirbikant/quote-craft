import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import { getToken } from "./utils/api";
import QuotesListPage from "./components/QuotesListPage";
import QuoteCreationPage from "./components/QuoteCreationPage";

const App = () => {
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    localStorage.removeItem("token");

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
          element={token ? <QuotesListPage /> : <Navigate to="/" />}
        />
        <Route
          path="/create-quote"
          element={token ? <QuoteCreationPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

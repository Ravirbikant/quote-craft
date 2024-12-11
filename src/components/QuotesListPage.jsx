import React, { useState, useEffect } from "react";
import { getQuotes, getToken, logout, removeToken } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./quotesListPage.css"; // Import the external CSS file
import Loading from "./Loading";
import { formatDateTime } from "../utils/commonFunctions";

const QuotesListPage = ({ onLogout }) => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuotes();
  }, [offset]);

  const loadQuotes = async () => {
    setLoading(true);
    const newQuotes = await getQuotes(1000, offset);
    if (newQuotes.length === 0) setHasMore(false);
    // else setQuotes((prev) => [...prev, ...newQuotes?.data]);
    else {
      const filteredQuotes = newQuotes?.data.filter(
        (quote) => quote.username === "ravi"
      );
      setQuotes((prev) => [...prev, ...filteredQuotes]);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    removeToken(); // Remove token
    onLogout(null);
    navigate("/"); // Redirect to login page
  };

  const handleCreateQuote = () => {
    navigate("/create-quote"); // Navigate to the "Create Quote" page
  };

  return (
    <div>
      <div className="top">
        <h2>Quote-craft</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="quotes-container">
        <button onClick={handleCreateQuote} className="create-quote-button">
          +
        </button>

        {loading ? (
          <Loading />
        ) : (
          quotes.map((quote, index) => (
            <div key={index} className="quote-item">
              <div className="quote-image-container">
                <img src={quote.mediaUrl} alt="Quote" className="quote-image" />
                <div className="quote-text-overlay">"{quote.text}"</div>
              </div>
              <div className="quote-details">
                <p>By: {quote.username}</p>
                <p>{formatDateTime(quote.createdAt)}</p>
              </div>
            </div>
          ))
        )}

        {hasMore && (
          <button
            onClick={() => setOffset((prev) => prev + 20)}
            className="load-more-button"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default QuotesListPage;

import React, { useState, useEffect } from "react";
import { getQuotes, getToken, logout, removeToken } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./quotesListPage.css"; // Import the external CSS file

const QuotesListPage = ({ onLogout }) => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuotes();
  }, [offset]);

  const loadQuotes = async () => {
    const newQuotes = await getQuotes(1000, offset);
    if (newQuotes.length === 0) setHasMore(false);
    else setQuotes((prev) => [...prev, ...newQuotes?.data]);
  };

  const handleLogout = () => {
    removeToken(); // Remove token
    onLogout(null);
    console.log(getToken());
    navigate("/"); // Redirect to login page
  };

  const handleCreateQuote = () => {
    navigate("/create-quote"); // Navigate to the "Create Quote" page
  };

  return (
    <div>
      <div className="top">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="quotes-container">
        <button onClick={handleCreateQuote} className="create-quote-button">
          +
        </button>

        {quotes.map((quote, index) => (
          <div key={index} className="quote-item">
            <div className="quote-image-container">
              <img src={quote.mediaUrl} alt="Quote" className="quote-image" />
              <div className="quote-text-overlay">{quote.text}</div>
            </div>
            <div className="quote-details">
              <p>By: {quote.username}</p>
              <p>At: {new Date(quote.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}

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

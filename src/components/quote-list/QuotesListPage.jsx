import React, { useState, useEffect } from "react";
import { getQuotes, removeToken } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "./quotesListPage.css";
import Loading from "../loading/Loading";
import { formatDateTime } from "../../utils/commonFunctions";

const Quote = ({ quote, index }) => {
  return (
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
  );
};

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
    const newQuotes = await getQuotes(20, offset);
    if (newQuotes.length === 0) setHasMore(false);
    else setQuotes((prev) => [...prev, ...newQuotes?.data]);
    setLoading(false);
  };

  const handleLogout = () => {
    removeToken();
    onLogout(null);
    navigate("/");
  };

  const handleCreateQuote = () => {
    navigate("/create-quote");
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
          Create Quote
        </button>

        {loading ? (
          <Loading />
        ) : (
          quotes.map((quote, index) => <Quote quote={quote} index={index} />)
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

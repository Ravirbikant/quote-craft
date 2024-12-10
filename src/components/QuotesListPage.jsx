import React, { useState, useEffect } from "react";
import { getQuotes, logout } from "../utils/api";
import { useNavigate } from "react-router-dom";

const QuotesListPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuotes();
  }, [offset]);

  const loadQuotes = async () => {
    const newQuotes = await getQuotes(500, offset);
    if (newQuotes.length === 0) setHasMore(false);
    else
      setQuotes((prev) => [
        ...prev,
        ...newQuotes?.data?.filter((quote) => quote.username === "oreoravi"),
      ]);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreateQuote = () => {
    navigate("/create-quote"); // Navigate to the "Create Quote" page
  };

  return (
    <div className="p-4">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded mb-4"
      >
        Logout
      </button>

      <button
        onClick={handleCreateQuote}
        className="fixed bottom-10 right-10 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600"
      >
        +
      </button>
      {quotes.map((quote, index) => (
        <div key={index} className="mb-4">
          <div className="relative w-1/2 h-[200px] mx-auto">
            <img
              src={quote.mediaUrl}
              alt="Quote"
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
              {quote.text}
            </div>
          </div>
          <div className="text-gray-600 mt-2">
            <p>By: {quote.username}</p>
            <p>At: {new Date(quote.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
      {hasMore && (
        <button
          onClick={() => setOffset((prev) => prev + 20)}
          className="w-full py-2 bg-blue-500 text-white"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default QuotesListPage;

import React, { useState, useRef } from "react";
import { uploadMedia, createQuote, removeToken } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "./quoteCreationPage.css";

const QuoteCreationPage = ({ onLogout }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const mediaUrlRef = useRef("");
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    onLogout(null);
    navigate("/");
  };

  const handleImageUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    try {
      const mediaResponse = await uploadMedia(file);
      mediaUrlRef.current = mediaResponse?.[0]?.url;
      setIsImageUploaded(true);
      alert("Image uploaded successfully!");
    } catch (error) {
      alert("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim() || !mediaUrlRef.current) {
      alert("Please provide both quote text and an uploaded image.");
      return;
    }

    try {
      await createQuote(text, mediaUrlRef.current);
      alert("Quote created successfully!");
      navigate("/quotes");
    } catch (error) {
      alert("Failed to create quote. Please try again.");
    }
  };

  return (
    <div>
      <div className="top">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/quotes");
          }}
        >
          <h2>Quote-craft</h2>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="quote-container">
        <h2>Create a Quote</h2>

        {file ? (
          <p>{file?.name}</p>
        ) : (
          <label for="file-upload" className="file-upload-label">
            Select Image
          </label>
        )}

        <input
          type="file"
          id="file-upload"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-upload-input"
          accept="image/*"
        />
        <button
          onClick={handleImageUpload}
          className={`upload-button ${isUploading ? "uploading" : ""}`}
          disabled={isUploading || isImageUploaded}
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>

        {isImageUploaded && (
          <div className="uploaded-media">
            <p className="success-text">Image uploaded successfully!</p>
            <img
              src={mediaUrlRef.current}
              alt="Uploaded"
              className="uploaded-image"
            />
            <p className="media-url">{mediaUrlRef.current}</p>
          </div>
        )}

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your quote text"
          className="textarea-field"
          disabled={!isImageUploaded}
        />

        <button
          onClick={handleSubmit}
          className={`create-button ${isImageUploaded ? "active" : ""}`}
          disabled={!isImageUploaded || !text.trim()}
        >
          Create Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteCreationPage;

import React, { useState, useRef } from "react";
import { uploadMedia, createQuote } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./quoteCreationPage.css"; // Import the external CSS file

const QuoteCreationPage = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const mediaUrlRef = useRef("");
  const navigate = useNavigate();

  const handleImageUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    try {
      const mediaResponse = await uploadMedia(file);
      mediaUrlRef.current = mediaResponse?.[0]?.url; // Store media URL in useRef
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
    <div className="quote-container">
      <h2>Create a Quote</h2>

      {/* File Upload */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="file-upload-input"
      />
      <button
        onClick={handleImageUpload}
        className={`upload-button ${isUploading ? "uploading" : ""}`}
        disabled={isUploading || isImageUploaded}
      >
        {isUploading ? "Uploading..." : "Upload Image"}
      </button>

      {/* Display Media URL */}
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

      {/* Quote Text */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your quote text"
        className="textarea-field"
        disabled={!isImageUploaded} // Disable until image is uploaded
      />

      {/* Create Quote */}
      <button
        onClick={handleSubmit}
        className={`create-button ${isImageUploaded ? "active" : ""}`}
        disabled={!isImageUploaded || !text.trim()} // Disable until valid input
      >
        Create Quote
      </button>
    </div>
  );
};

export default QuoteCreationPage;

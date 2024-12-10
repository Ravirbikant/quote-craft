import React, { useState, useRef } from "react";
import { uploadMedia, createQuote } from "../utils/api";
import { useNavigate } from "react-router-dom";

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
      console.log(mediaResponse?.[0]?.url);
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
    console.log(mediaUrlRef.current);
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create a Quote</h2>

      {/* File Upload */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleImageUpload}
        className={`px-4 py-2 ${
          isUploading ? "bg-gray-500" : "bg-blue-500"
        } text-white rounded mb-4`}
        disabled={isUploading || isImageUploaded}
      >
        {isUploading ? "Uploading..." : "Upload Image"}
      </button>

      {/* Display Media URL */}
      {isImageUploaded && (
        <div className="mb-4">
          <p className="text-green-500">Image uploaded successfully!</p>
          <img
            src={mediaUrlRef.current}
            alt="Uploaded"
            className="w-full h-auto mb-2"
          />
          <p className="text-sm text-gray-500 break-words">
            {mediaUrlRef.current}
          </p>
        </div>
      )}

      {/* Quote Text */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your quote text"
        className="w-full p-2 border rounded mb-4"
        disabled={!isImageUploaded} // Disable until image is uploaded
      />

      {/* Create Quote */}
      <button
        onClick={handleSubmit}
        className={`px-4 py-2 ${
          isImageUploaded ? "bg-green-500" : "bg-gray-500"
        } text-white rounded`}
        disabled={!isImageUploaded || !text.trim()} // Disable until valid input
      >
        Create Quote
      </button>
    </div>
  );
};

export default QuoteCreationPage;

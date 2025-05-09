import { useState } from "react";
import "./Form.scss";

export default function MainForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isDisabled = !title.trim() || !content.trim();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    if (isDisabled) return;
    console.log("Post Created:", { title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="main-form-container">
      <div className="main-form-header">
        <span className="title">CodeLeap Network</span>
      </div>

      <div className="form-content">
        <div className="main-form-woym">
          <h2 className="main-form-woym-text">What’s on your mind?</h2>
          <span className="main-form-label">Title</span>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="main-form-input"
            placeholder="Your next big idea"
          />
          <span className="main-form-label">Content</span>
          <textarea
            value={content}
            onChange={handleContentChange}
            className="main-form-textarea"
            placeholder="Write down your ideas, dreams, and plans..."
          />
          <button
            className={`main-form-button ${isDisabled ? "disabled" : ""}`}
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

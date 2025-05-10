import { useState } from "react";
import '../../../../styles/PostForm.scss';
import BaseButton from "../../../BaseComponents/BaseButton/BaseButton";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isDisabled = !title.trim() || !content.trim();

  const handleSubmit = () => {
    if (isDisabled) return;
    console.log("Post Created:", { title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="main-form-woym">
      <h2 className="main-form-woym-text">What’s on your mind?</h2>

      <span className="main-form-label">Title</span>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="main-form-input"
        placeholder="Your next big idea"
      />

      <span className="main-form-label">Content</span>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="main-form-textarea"
        placeholder="Write down your ideas, dreams, and plans..."
      />

      <div className="main-form-button-container">
        <BaseButton
          disabled={isDisabled}
          onClick={handleSubmit}
          buttonText="Create"
        />
      </div>
    </div>
  );
}

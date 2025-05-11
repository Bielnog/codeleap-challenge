import { useState, useEffect } from "react";
import "../../../../styles/PostForm.scss";
import BaseButton from "../../../BaseComponents/BaseButton/BaseButton";

type PostFormProps = {
  username: string;
  onCancel?: () => void;
  headerText?: string;
  initialTitle?: string;
  initialContent?: string;
} & (
  | {
      isEdit?: false;
      onCreatePost: (title: string, content: string) => void;
      onEditPost?: never;
    }
  | {
      isEdit: true;
      onEditPost: (title: string, content: string) => void;
      onCreatePost?: never;
    }
);

export default function PostForm({
  onCreatePost,
  onEditPost,
  onCancel,
  headerText = "What’s on your mind?",
  isEdit = false,
  initialTitle = "",
  initialContent = "",
}: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const isDisabled = !title.trim() || !content.trim();

  const handleSubmit = async () => {
    if (isDisabled) return;

    try {
      if (isEdit && onEditPost) {
        onEditPost(title, content);
      } else if (!isEdit && onCreatePost) {
        onCreatePost(title, content);
      }
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className={`main-form-woym ${isEdit ? "edit-mode" : ""}`}>
      <h2 className="main-form-woym-text">{headerText}</h2>

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
          onClick={onCancel || (() => {})}
          buttonText="Cancel"
          buttonColor="#FFFFFF"
          buttonTextColor="#000"
          haveBorder={true}
          show={isEdit}
        />
        <BaseButton
          disabled={isDisabled}
          onClick={handleSubmit}
          buttonText={isEdit ? "Save" : "Create"}
          buttonColor={isEdit ? "#47B960" : "#7695EC"}
        />
      </div>
    </div>
  );
}

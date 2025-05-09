import "./Post.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteModal from "./PostForm/Modals/DeleteModal";
import { useState } from "react";

interface PostProps {
  title: string;
  content: string;
  author: string;
  timestamp: string;
}

export default function Post({ title, content, author, timestamp }: PostProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="post-container">
      <div className="post-header">
        <span className="post-title">{title}</span>
        <div className="post-actions">
          <FaEdit className="post-icon" />
          <FaTrash className="post-icon" onClick={() => setIsModalOpen(true)} />
          <DeleteModal
            show={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onConfirm={() => {
              console.log("Post deleted");
              setIsModalOpen(false);
            }}
          />
        </div>
      </div>

      <div className="post-meta">
        <span className="post-author">@{author}</span>
        <span className="post-timestamp">{timestamp}</span>
      </div>

      <div className="post-content">{content}</div>
    </div>
  );
}

import "../../../styles/Post.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteModal from "./PostForm/Modals/DeleteModal/DeleteModal";
import { useState } from "react";
import EditModal from "./PostForm/Modals/EditModal/EditModal";

interface PostProps {
  title: string;
  content: string;
  author: string;
  timestamp: string;
}

export default function Post({ title, content, author, timestamp }: PostProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="post-container">
      <div className="post-header">
        <span className="post-title">{title}</span>
        <div className="post-actions">
          <FaEdit
            className="post-icon"
            onClick={() => setIsEditModalOpen(true)}
          />
          <EditModal
            show={isEditModalOpen}
            onCancel={() => setIsEditModalOpen(false)}
            onConfirm={() => {
              console.log("Post Edited");
              setIsEditModalOpen(false);
            }}
          />
          <FaTrash
            className="post-icon"
            onClick={() => setIsDeleteModalOpen(true)}
          />
          <DeleteModal
            show={isDeleteModalOpen}
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={() => {
              console.log("Post deleted");
              setIsDeleteModalOpen(false);
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

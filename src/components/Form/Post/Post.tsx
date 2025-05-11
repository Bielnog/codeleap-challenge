import "../../../styles/Post.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteModal from "./PostForm/Modals/DeleteModal/DeleteModal";
import EditModal from "./PostForm/Modals/EditModal/EditModal";
import { useState } from "react";
import { api } from "../../../utils/apiAccess";
import { formatDistanceToNow, parseISO } from "date-fns";

interface PostProps {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  onEdit?: () => void;
  onDelete?: () => void;
  currentUser?: string;
}

export default function Post({
  id,
  title,
  content,
  author,
  timestamp,
  onEdit,
  onDelete,
  currentUser,
}: PostProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await api.deletePost(`${id}`);
      setIsDeleteModalOpen(false);
      onDelete?.();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = async (newTitle: string, newContent: string) => {
    try {
      await api.updatePost(id, { title: newTitle, content: newContent });
      setIsEditModalOpen(false);
      onEdit?.();
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const formattedTimestamp = formatDistanceToNow(parseISO(timestamp), {
    addSuffix: true,
  });

  return (
    <div className="post-container">
      <div className="post-header">
        <span className="post-title">{title}</span>
        {currentUser === author && (
          <div className="post-actions">
            <FaTrash
              className="post-icon"
              onClick={() => setIsDeleteModalOpen(true)}
            />
            <DeleteModal
              show={isDeleteModalOpen}
              onCancel={() => setIsDeleteModalOpen(false)}
              onConfirm={handleDelete}
            />
            <FaEdit
              className="post-icon"
              onClick={() => setIsEditModalOpen(true)}
            />
            <EditModal
              show={isEditModalOpen}
              onCancel={() => setIsEditModalOpen(false)}
              onConfirm={handleEdit}
              initialTitle={title}
              initialContent={content}
            />
          </div>
        )}
      </div>

      <div className="post-meta">
        <span className="post-author">@{author}</span>
        <span className="post-timestamp">{formattedTimestamp}</span>
      </div>

      <div className="post-content">{content}</div>
    </div>
  );
}

import BaseModal from "../../BaseModal/BaseModal";
import PostForm from "../../../Form/Post/PostForm/PostForm";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../utils/AuthContext";

type EditModalProps = {
  show: boolean;
  onCancel: () => void;
  onConfirm: (title: string, content: string) => void;
  initialTitle?: string;
  initialContent?: string;
};

export default function EditModal({
  show,
  onCancel,
  onConfirm,
  initialTitle = "",
  initialContent = "",
}: EditModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const { user } = useAuth();

  useEffect(() => {
    if (show) {
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [show, initialTitle, initialContent]);

  return (
    <BaseModal
      show={show}
      onClose={onCancel}
      onConfirm={() => onConfirm(title, content)}
    >
      <PostForm
        isEdit={true}
        headerText="Edit item"
        username={user?.displayName || ""}
        onEditPost={onConfirm}
        onCancel={onCancel}
        initialTitle={initialTitle}
        initialContent={initialContent}
      />
    </BaseModal>
  );
}

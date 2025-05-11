import { getUsername } from "../../../../../../utils/username";
import BaseModal from "../../../../../BaseComponents/BaseModal/BaseModal";
import PostForm from "../../PostForm";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (show) {
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [show, initialTitle, initialContent]);

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    getUsername().then((name) => setUsername(name));
  }, []);

  return (
    <BaseModal
      show={show}
      onClose={onCancel}
      onConfirm={() => onConfirm(title, content)}
    >
      <PostForm
        isEdit={true}
        headerText="Edit item"
        username={username || ""}
        onEditPost={onConfirm}
        onCancel={onCancel}
        initialTitle={initialTitle}
        initialContent={initialContent}
      />
    </BaseModal>
  );
}

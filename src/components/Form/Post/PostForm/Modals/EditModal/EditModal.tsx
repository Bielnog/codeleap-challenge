import getUsername from "../../../../../../utils/getUsername";
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

  const username = getUsername();

  return (
    <BaseModal
      show={show}
      onClose={onCancel}
      onConfirm={() => onConfirm(title, content)}
    >
      <PostForm
        isEdit={true}
        headerText="Edit item"
        username={username}
        onEditPost={onConfirm}
        onCancel={onCancel}
        initialTitle={initialTitle}
        initialContent={initialContent}
      />
    </BaseModal>
  );
}

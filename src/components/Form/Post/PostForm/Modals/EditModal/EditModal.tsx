import BaseModal from "../../../../../BaseComponents/BaseModal/BaseModal";
import PostForm from "../../PostForm";
import "../../../../../../styles/DeleteModal.scss";

type DeleteModalProps = {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({
  show,
  onCancel,
  onConfirm,
}: DeleteModalProps) {
  return (
    <BaseModal show={show} onClose={onCancel} onConfirm={onConfirm}>
      <PostForm></PostForm>
    </BaseModal>
  );
}

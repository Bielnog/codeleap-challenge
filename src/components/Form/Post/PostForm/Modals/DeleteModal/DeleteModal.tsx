import BaseButton from "../../../../../BaseComponents/BaseButton/BaseButton";
import BaseModal from "../../../../../BaseComponents/BaseModal/BaseModal";
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
    <BaseModal show={show} onClose={onCancel}>
      <div className="delete-modal">
        <p className="message">Are you sure you want to delete this item?</p>
        <div className="actions">
          <BaseButton
            onClick={onCancel}
            buttonText="Cancel"
            buttonColor="#FFFFFF"
            buttonTextColor="#000"
            haveBorder={true}
          />
          <BaseButton
            onClick={onConfirm}
            buttonText="Delete"
            buttonColor="#FF5151"
          />
        </div>
      </div>
    </BaseModal>
  );
}

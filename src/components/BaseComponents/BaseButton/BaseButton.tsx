import "../../../styles/BaseButton.scss";

interface BaseButtonProps {
  disabled?: boolean;
  show?: boolean;
  onClick: () => void;
  buttonText?: React.ReactNode;
  buttonColor?: string;
  buttonTextColor?: string;
  haveBorder?: boolean;
}
export default function BaseButton({
  disabled = false,
  onClick,
  buttonText,
  buttonColor,
  buttonTextColor,
  haveBorder = false,
  show = true,
}: BaseButtonProps) {
  return (
    <button
      className={`button ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#ccc" : buttonColor || "#7695ec",
        color: buttonTextColor,
        border: haveBorder ? "1px solid #999999" : "none",
        display: show ? "block" : "none",
      }}
    >
      {buttonText}
    </button>
  );
}

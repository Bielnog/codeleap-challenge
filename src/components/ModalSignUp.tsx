import "./ModalSignUp.scss";

export default function ModalSignUp() {
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Welcome to CodeLeap network!</h2>
        </div>
        <div className="modal-body">
          <p className="modal-text">Please enter your username</p>
          <input type="text" className="modal-input" placeholder="John doe" />
        </div>
        <div className="modal-footer">
          <button className="modal-button">ENTER</button>
        </div>
      </div>
    </div>
  );
}

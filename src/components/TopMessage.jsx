import { useEffect } from "react";
import "../styles/topMessage.css";

export default function TopMessage({ type = "success", message, onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose && onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`top-message ${type}`}>
      <div className="message-content">
        <span className="message-text">{message}</span>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import "../../styles/components/dropdown.css";

function Dropdown({ isOpen, items, onClose, parentRef }) {
  // ✅ Click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (parentRef.current && parentRef.current.contains(e.target)) {
        return; // ✅ click inside (button OR dropdown)
      }

      onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, parentRef]);

  // ✅ ESC key
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="dropdown">
      {items.map((item, index) => (
        <div
          key={index}
          className="dropdown__item"
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default Dropdown;

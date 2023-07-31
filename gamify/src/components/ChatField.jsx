import { useEffect, useState } from "react";

export default function ChatField() {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const text = "I will destroy you with my PPRO spell!";
  const delay = 50;
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <div className="bubble">
      <div className="text">
        <p>{currentText}</p>
      </div>
    </div>
  );
}

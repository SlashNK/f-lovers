import React, { useState, useRef, useEffect } from "react";
import "./Send.css";
import { getResUrl } from "../../shared/paramsEncode";

function Send() {
  const [messages, setMessages] = useState([""]); // Initial array with one empty message
  const [bgColor, setBgColor] = useState("pink");
  const [resUrl, setResUrl] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.focus();
    }
  }, [messages]);

  // Function to handle changes in the background color input
  const handleColorChange = (e) => {
    setBgColor(e.target.value);
  };

  // Function to handle changes in the message inputs
  const handleMessageChange = (index, value) => {
    const newMessages = [...messages];
    newMessages[index] = value;
    setMessages(newMessages);
  };

  // Function to add a new input field for a message
  const addMessageInput = () => {
    setMessages([...messages, ""]);
  };

  // Function to handle key down event on the last input field
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" && index !== 0 && !messages[index].trim()) {
      e.preventDefault();
      const newMessages = [...messages];
      newMessages.splice(index, 1); // Remove the current empty input
      setMessages(newMessages);
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        // Focus the previous input
        const prevInputRef = document.getElementById(`message${prevIndex}`);
        if (prevInputRef) {
          prevInputRef.focus();
        }
      }
    } else if (e.key === "Enter") {
      addMessageInput();
    }
  };

  // Function to handle submit
  const handleSubmit = () => {
    setResUrl(getResUrl(bgColor, messages));
  };

  // Function to copy URL to clipboard
  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(resUrl)
      .then(() => {
        console.log("URL copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy URL to clipboard:", error);
      });
  };

  return (
    <div className="Send" style={{ backgroundColor: bgColor }}>
      <form>
        <label htmlFor="color">Background Color:</label>
        <input
          type="text"
          id="color"
          value={bgColor}
          onChange={handleColorChange}
        />
        {messages.map((message, index) => (
          <div key={index}>
            <label htmlFor={`message${index}`}>paragraph</label>
            <input
              type="text"
              id={`message${index}`}
              value={message}
              onChange={(e) => handleMessageChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            />
          </div>
        ))}
      </form>
      <button onClick={addMessageInput}>Add message</button>
      <button onClick={handleSubmit}>Submit</button>
      <div
        onClick={copyUrlToClipboard}
        style={{ cursor: "pointer", textDecoration: "underline" }}
      >
        {resUrl && resUrl.length > 0 ? resUrl : "Generate URL first"}
      </div>
    </div>
  );
}

export default Send;

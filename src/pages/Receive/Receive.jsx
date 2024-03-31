import React, { useState, useEffect } from "react";
import "./Receive.css";
import { decodeMessages, encodeMessages, isColor } from "../../shared/paramsEncode";
import { MESSAGES_SEPARATOR } from "../../shared/constants";
import { Flower } from "../../features/Flower/Flower";

function Receive() {
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [messageInterval, setMessageInterval] = useState(null);
  const [isTalking, setIsTalking] = useState(false);
  const [bgColor, setBgColor] = useState("white");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bgColor = urlParams.get("bg");
    if(isColor(bgColor)) {
      setBgColor(bgColor);
    }
    setBgColor(urlParams.get("bg"));
    const encodedMessages = urlParams.get("message");
    const decodedMessages = decodeMessages(encodedMessages);
    setMessages(decodedMessages);
  }, []);

  useEffect(() => {
    if (messages.length > 0 && !messageInterval) {
      startMessageInterval();
    } else if (messages.length === 0 && messageInterval) {
      clearInterval(messageInterval);
      setMessageInterval(null);
    }

    return () => {
      if (messageInterval) {
        clearInterval(messageInterval);
      }
    };
  }, [messages, messageInterval]);

  const startMessageInterval = () => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % messages.length;
        if (nextIndex === 0) {
          setIsTalking(false);
          clearInterval(interval); // Stop interval when it reaches the last index
          return prevIndex;
        }
        return nextIndex;
      });
    }, 1000);

    setMessageInterval(interval);
    setIsTalking(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputMessage = formData.get("message").split(MESSAGES_SEPARATOR);
    const hashedMessage = encodeMessages(inputMessage);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("message", hashedMessage);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${searchParams}`
    );
    setMessages(inputMessage);
    setCurrentMessageIndex(0);
    if (messageInterval) {
      clearInterval(messageInterval);
      setMessageInterval(null);
    }
    startMessageInterval();
  };

  const handleReplay = () => {
    setCurrentMessageIndex(0);
    if (messageInterval) {
      clearInterval(messageInterval);
      setMessageInterval(null);
    }
    startMessageInterval();
  };

  return (
    <div className="Receive" style={{ backgroundColor:bgColor }}>
      <div>{messages[currentMessageIndex]}</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message</label>
        <input name="message" id="message" />
        <button type="submit">Submit</button>
      </form>
      <Flower isTalking={isTalking} />
      <button onClick={handleReplay}>Replay</button>
    </div>
  );
}

export default Receive;

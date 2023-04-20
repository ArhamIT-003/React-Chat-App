import React, { useState, useEffect } from "react";
import "./styles/chat.css";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db, auth } from "../db/firebase-config";

export const Chat = ({ room, signUserOut }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessage = query(messageRef, where("room", "==", room));

    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return unsubscribe;
  }, [room]); // messageRef does not need to be in the dependency array

  const sendChat = async (e) => {
    e.preventDefault();

    if (message.trim().length === 0) {
      return;
    }

    try {
      await addDoc(messageRef, {
        text: message,
        createdAt: serverTimestamp(),
        username: auth.currentUser.displayName,
        room,
      });

      setMessage("");
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-app">
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <p className="message-username">{message.username}</p>
              <p className="message-text">{message.text}</p>
            </div>
          ))}
        </div>
        <form className="new-chat-form" onSubmit={sendChat}>
          <input
            className="new-chat-input"
            placeholder="Type anything you want to send..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button type="submit" className="new-chat-btn">
            Send
          </button>
        </form>
      </div>

      <div className="sign-out">
        <button className="new-chat-btn" onClick={signUserOut}>
          Sign-Out
        </button>
      </div>
    </div>
  );
};

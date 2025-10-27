import {  useState } from "react";

import { logout } from "./login";
import { useWebSocket } from "../wsGlobal";

export default function RiddlePage() {
  const { sendChat, messages } = useWebSocket();
  const [text, setText] = useState("");
  const name = localStorage.getItem("name") || "Guest";

  

  const handleSend = () => {
    if (text.trim()) {
      sendChat(name, text);
      setText("");
    }
  };

  return (
    
    <div style={{ padding: "2rem" }}>
        <button onClick={logout}>Logga ut</button>
      <h1>💭 Mind War Chat</h1>

      <ul
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          listStyle: "none",
          maxWidth: "500px",
          height: "300px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Skriv ett meddelande..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Skicka</button>
      </div>
    </div>
  );
}
import {  useEffect, useState } from "react";

import { logout } from "./login";
import { useWebSocket } from "../wsGlobal";
import {  sendGuess } from "../api/riddleApi";


export default function RiddlePage() {
  const { sendChat, messages, riddle, requestNextRiddle } = useWebSocket();
  const [text, setText] = useState("");
  const name = localStorage.getItem("name") || "Guest";

  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading] = useState(false);

useEffect(() => {
  requestNextRiddle();
}, []);



 const nextRiddle = () => {
  setGuess("");
  setResult(null);
  requestNextRiddle();
};




  const handleGuess = async () => {
    if (!riddle) return;
  
    try {
      const response = await sendGuess(riddle.id, guess);
      console.log("Guess response:", response);
      setResult(response);

      if (response.includes("✅")) {
        sendChat("System", `${name} rätt gissning`);

      } else {
        sendChat("System", `${name} fel gissning`);
      }
      setGuess("");
    } catch (error) {
      console.error("Error sending guess:", error);
    }
    };
  

  const handleSend = () => {
    if (text.trim()) {
      sendChat(name, text);
      setText("");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={logout}>Logga ut</button>
      <h1>💭 Mind War </h1>

      {/* 🧩 GÅTAN */}
      <div
        style={{
          backgroundColor: "#f7f7f78a",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1.5rem",
          maxWidth: "500px",
        }}
      >
        {loading ? (
          <p>Hämtar gåta...</p>
        ) : riddle ? (
          <>
            <h3>🧠 Dagens gåta:</h3>
            <p>{riddle.riddle}</p>

            <input
              type="text"
              placeholder="Din gissning..."
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              style={{ marginTop: "0.5rem" }}
            />
            <button onClick={handleGuess}>Skicka gissning</button>

            {result && (
              <p
                style={{
                  marginTop: "0.5rem",
                  color: result.includes("✅") ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {result}
              </p>
            )}

            <button
              onClick={nextRiddle}
              style={{ marginTop: "0.5rem", backgroundColor: "#dddddd5d" }}
            >
              🔁 Nästa gåta
            </button>
          </>
        ) : (
          <p>Ingen gåta tillgänglig</p>
        )}
      </div>

      {/* 💬 CHAT */}
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
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  connectWebSocket,
  disconnectWebSocket,
  sendChat,
  sendHello,
} from "./api/wsApi";

interface WebSocketContextType {
  sendChat: (name: string, content: string) => void;
  sendHello: (name: string) => void;
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    console.log("🌐 Connecting global WebSocket...");

    connectWebSocket(
      (greeting) => setMessages((prev) => [...prev, `🤖 ${greeting.content}`]),
      (chat) => setMessages((prev) => [...prev, `🧠 ${chat.chat}`])
    );

    return () => {
      console.log("❌ Disconnecting global WebSocket...");
      disconnectWebSocket();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ sendChat, sendHello, messages, setMessages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWebSocket must be used inside WebSocketProvider");
  return context;
};

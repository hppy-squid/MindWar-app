import React, { createContext, useContext, useEffect, useState } from "react";
import {
  connectWebSocket,
  disconnectWebSocket,
  sendChat,
  sendHello,
  requestNextRiddle

} from "./api/wsApi";

interface WebSocketContextType {
  sendChat: (name: string, content: string) => void;
  sendHello: (name: string) => void;
  requestNextRiddle: () => void;
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  riddle: { id: number; riddle: string } | null;
  setRiddle: React.Dispatch<React.SetStateAction<{ id: number; riddle: string } | null>>;

}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [riddle, setRiddle] = useState<{ id: number; riddle: string } | null>(null);

  useEffect(() => {
    console.log("🌐 Connecting global WebSocket...");

    connectWebSocket(
      (greeting) => setMessages((prev) => [...prev, `🤖 ${greeting.content}`]),
      (chat) => setMessages((prev) => [...prev, `🧠 ${chat.chat}`]),
     (newRiddle) => {
        console.log("🧩 New riddle received:", newRiddle);
        setRiddle(newRiddle);
      }
    
    );

    return () => {
      console.log("❌ Disconnecting global WebSocket...");
      disconnectWebSocket();
    };
  }, []);

  return (
    <WebSocketContext.Provider 
    value={{ 
      sendChat, sendHello, requestNextRiddle, messages, setMessages, riddle, setRiddle,
      }}
      >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWebSocket must be used inside WebSocketProvider");
  return context;
};

import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import type { IMessage, Frame } from "@stomp/stompjs";

let stompClient: CompatClient | null = null;

export interface GreetingMessage {
  content: string;
}

export interface ChatMessage {
  chat: string;
}

// ✅ Anslut till backend och returnera klienten
export function connectWebSocket(
  onGreeting: (msg: GreetingMessage) => void,
  onChat: (msg: ChatMessage) => void,
  onConnected?: () => void
) {
  const socket = new SockJS("http://localhost:8080/websocket");
  const client = Stomp.over(socket);

  // Tyst debug-loggning
  client.debug = () => {};

  client.connect({}, (frame: Frame) => {
    console.log("✅ WebSocket connected:", frame);
    stompClient = client;

    client.subscribe("/topic/greetings", (message: IMessage) => {
      const data: GreetingMessage = JSON.parse(message.body);
      onGreeting(data);
    });

    client.subscribe("/topic/chat", (message: IMessage) => {
      const data: ChatMessage = JSON.parse(message.body);
      onChat(data);
    });

    if (onConnected) onConnected();
  });

  return client;
}

export function disconnectWebSocket() {
  if (stompClient && stompClient.connected) {
    stompClient.disconnect(() => console.log("❌ WebSocket disconnected"));
  }
}

export function sendHello(name: string) {
  if (!stompClient || !stompClient.connected) return;
  stompClient.send("/app/hello", {}, JSON.stringify({ name }));
}

export function sendChat(name: string, content: string) {
  if (!stompClient || !stompClient.connected) return;
  stompClient.send("/app/chat", {}, JSON.stringify({ name, content }));
}
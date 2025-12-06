import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type Message = { id: string; text: string; role: "user" | "assistant" };

const WS_URL = "wss://ws.postman-echo.com/raw";

export default function Chat() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => console.log("WS connected");
    socket.onmessage = (ev) => {
      const msg = ev.data;
      setMessages((m) => [
        ...m,
        { id: `${Date.now()}-${Math.random()}`, text: msg, role: "assistant" },
      ]);
    };
    socket.onerror = (e) => console.error("WS error", e);
    setWs(socket);

    return () => socket.close();
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!text.trim() || !ws || ws.readyState !== WebSocket.OPEN) return;
    const msg = text.trim();
    setMessages((m) => [...m, { id: `${Date.now()}`, text: msg, role: "user" }]);
    ws.send(msg);
    setText("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "70vh" }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Чат с ассистентом</Typography>
        <Typography variant="body2" color="text.secondary">
          Пользователь — справа, ассистент — слева.
        </Typography>
      </Paper>

      <Paper sx={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <Box
          ref={listRef}
          sx={{
            overflowY: "auto",
            px: 2,
            py: 1,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {messages.map((m) => (
            <Box
              key={m.id}
              sx={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: m.role === "user" ? "primary.main" : "grey.300",
                  color: m.role === "user" ? "primary.contrastText" : "text.primary",
                  maxWidth: "70%",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {m.text}
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", p: 2, gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Введите сообщение..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <IconButton color="primary" onClick={send}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
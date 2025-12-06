import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Link from "next/link";
import Chat from "../components/Chat";

export default function ChatPage() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Чат
          </Typography>
          <Button color="inherit" component={Link} href="/documents">
            Документы
          </Button>
          <Button color="inherit" component={Link} href="/chat">
            Чат
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Chat />
      </Container>
    </>
  );
}
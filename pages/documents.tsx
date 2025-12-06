import React, { useState } from "react";
import axios from "axios";
import { GetStaticProps } from "next";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import DocumentTable from "../components/DocumentTable";
import DocumentModal from "../components/DocumentModal";
import { DocumentItem } from "../types";
import { randomSemver, randomSizeKB, isoFromId } from "../utils/helpers";

type Props = {
  docs: DocumentItem[];
};

export default function DocumentsPage({ docs }: Props) {
  const [selected, setSelected] = useState<DocumentItem | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Документы
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
        <Typography variant="h5">Список документов (мок)</Typography>
        <DocumentTable
          items={docs}
          onOpen={(it) => {
            setSelected(it);
            setOpen(true);
          }}
        />
        <DocumentModal
          open={open}
          item={selected ?? undefined}
          onClose={() => setOpen(false)}
        />
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const r = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const posts = (r.data || []).slice(0, 10);

  const docs: DocumentItem[] = posts.map((p: any) => {
    const id = Number(p.id);
    return {
      id,
      file_name: (p.title || "").slice(0, 80),
      version: randomSemver(id),
      size_kb: randomSizeKB(id),
      uploaded_at: isoFromId(id),
      body: p.body,
    };
  });

  return {
    props: { docs },
    revalidate: 60 * 60, 
  };
};
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { DocumentItem } from "../types";

type Props = {
  items: DocumentItem[];
  onOpen: (item: DocumentItem) => void;
};

export default function DocumentTable({ items, onOpen }: Props) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название файла</TableCell>
            <TableCell>Версия</TableCell>
            <TableCell>Размер</TableCell>
            <TableCell>Дата загрузки</TableCell>
            <TableCell align="center">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((it) => (
            <TableRow key={it.id} hover>
              <TableCell>
                <Typography fontWeight={600}>{it.file_name}</Typography>
              </TableCell>
              <TableCell>{it.version}</TableCell>
              <TableCell>{it.size_kb} KB</TableCell>
              <TableCell>{new Date(it.uploaded_at).toLocaleString("en-GB")}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => onOpen(it)} aria-label="details">
                  <InfoIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
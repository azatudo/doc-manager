import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { DocumentItem } from "../types";

type Props = {
  open: boolean;
  item?: DocumentItem | null;
  onClose: () => void;
};

export default function DocumentModal({ open, item, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function analyze() {
    if (!item) return;
    setLoading(true);
    setResult(null);
    try {
      const r = await axios.post("/api/analyze", { id: item.id });
      setResult(r.data?.result || "Анализ выполнен");
    } catch (e) {
      setResult("Ошибка анализа");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Детали документа</DialogTitle>
      <DialogContent dividers>
        {!item ? (
          <Typography>Нет данных</Typography>
        ) : (
          <>
            <Typography variant="subtitle1" gutterBottom>
              {item.file_name}
            </Typography>
            <Typography>Версия: {item.version}</Typography>
            <Typography>Размер: {item.size_kb} KB</Typography>
            <Typography>
              Загружен: {new Date(item.uploaded_at).toLocaleString()}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {item.body || "— нет содержимого —"}
            </Typography>
            {result && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography color="success.main">{result}</Typography>
              </>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
        <Button
          variant="contained"
          onClick={analyze}
          disabled={loading || !item}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          Проанализировать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
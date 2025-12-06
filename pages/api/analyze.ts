import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.body || {};

  setTimeout(() => {
    res.status(200).json({
      id,
      result: "Анализ выполнен",
      summary: `Файл id=${id} успешно проанализирован (мок).`,
    });
  }, 600);
}
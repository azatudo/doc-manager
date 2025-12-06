export type DocumentItem = {
  id: number;
  file_name: string;
  version: string;
  size_kb: number;
  uploaded_at: string; 
  body?: string;
};
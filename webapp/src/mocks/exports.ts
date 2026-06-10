export type ExportFormat = "csv" | "freee" | "moneyForward" | "yayoi";
export type ExportStatus = "completed" | "processing" | "failed";

export interface ExportJob {
  id: string;
  ts: string;
  format: ExportFormat;
  period: string;
  rows: number;
  status: ExportStatus;
  user: string;
  fileSize?: string;
}

export const FORMAT_LABEL: Record<ExportFormat, string> = {
  csv: "CSV (汎用)",
  freee: "freee 取引データ",
  moneyForward: "マネーフォワード",
  yayoi: "弥生会計",
};

export const exportJobs: ExportJob[] = [
  { id: "e-001", ts: "2026-06-10 09:30:12", format: "csv", period: "2026/5/1〜2026/5/31", rows: 287, status: "completed", user: "竹下 直樹", fileSize: "42 KB" },
  { id: "e-002", ts: "2026-06-09 18:02:55", format: "freee", period: "2026/5/1〜2026/5/31", rows: 287, status: "completed", user: "竹下 直樹", fileSize: "—" },
  { id: "e-003", ts: "2026-06-09 11:15:38", format: "csv", period: "2026/4/1〜2026/4/30", rows: 264, status: "completed", user: "山本 智也", fileSize: "39 KB" },
  { id: "e-004", ts: "2026-06-09 10:48:22", format: "moneyForward", period: "2026/4/1〜2026/4/30", rows: 264, status: "processing", user: "竹下 直樹" },
  { id: "e-005", ts: "2026-06-08 17:22:09", format: "csv", period: "2026/3/1〜2026/3/31", rows: 231, status: "completed", user: "竹下 直樹", fileSize: "34 KB" },
  { id: "e-006", ts: "2026-06-08 14:10:55", format: "freee", period: "2026/3/1〜2026/3/31", rows: 231, status: "failed", user: "山本 智也" },
];

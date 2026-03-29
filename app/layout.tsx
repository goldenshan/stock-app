import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StockApp",
  description: "ระบบตรวจนับสต๊อค / ยืม-คืนอุปกรณ์",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}

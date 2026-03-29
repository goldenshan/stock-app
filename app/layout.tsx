import type { Metadata } from "next";
import "./globals.css";
import MSALProvider from "./providers/MSALProvider";

export const metadata: Metadata = {
  title: "StockApp",
  description: "ระบบตรวจนับสต๊อค / ยืม-คืนอุปกรณ์",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <MSALProvider>{children}</MSALProvider>
      </body>
    </html>
  );
}

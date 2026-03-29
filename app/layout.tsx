import "./globals.css";
import MSALProvider from "./providers/MSALProvider";

export const metadata = {
  title: "StockApp",
  description: "ระบบตรวจนับสต๊อค / ยืม-คืนอุปกรณ์",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <MSALProvider>{children}</MSALProvider>
      </body>
    </html>
  );
}
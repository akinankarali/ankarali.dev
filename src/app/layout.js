import localFont from "next/font/local";
import Layout from "./components/Layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Saim Akın Ankaralı",
  description: "Frontend Developer - Saim",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
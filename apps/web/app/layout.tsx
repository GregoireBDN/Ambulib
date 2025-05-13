import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/ui/appBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ambulib",
  description: "Application de gestion d'ambulances",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AppBar />
        {children}
      </body>
    </html>
  );
}

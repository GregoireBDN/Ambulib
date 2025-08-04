import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppBar } from "@/components/layout";
import { getSession } from "@/lib/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ambulib - Transport médical accessible",
  description: "Application de gestion d'ambulances spécialement conçue pour les personnes âgées et handicapées",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  const session = await getSession();

  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen bg-gray-50 antialiased`}>
        <AppBar session={session} />
        <main 
          id="main-content"
          role="main"
          className="focus:outline-none"
          tabIndex={-1}
        >
          {children}
        </main>
      </body>
    </html>
  );
}

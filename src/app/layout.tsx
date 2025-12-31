import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harvest Nutrition - Healthy Living Made Simple",
  description: "Discover nutritious recipes, meal plans, and wellness tips with Harvest Nutrition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

// app/layout.tsx
import { Provider } from "./components/ui/provider";

import type { Metadata } from "next";
import theme from "@/lib/theme"; // Import your custom theme
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Management System",
  description: "Manage student records efficiently",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body className="bg-gray-200">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
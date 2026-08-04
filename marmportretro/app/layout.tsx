import type { Metadata } from "next";
import type { ReactNode } from "react";
import Chrome from "./components/Chrome";
import "./globals.css";
import "./styles.css";

export const metadata: Metadata = {
  title: {
    default: "Mariem Touati — UI/UX Designer",
    template: "%s",
  },
  description:
    "Super ultra cool designer working on super ultra cool things.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
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
    "UI/UX designer working on transit, banking and retail interfaces from Osaka.",
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
import { Rubik } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@modules/app/react/ThemeProvider";
import { Header } from "@modules/app/react/layout/Header";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-rubik",
  adjustFontFallback: true,
});

export const metadata = {
  title: "Frontend Mentor | IP Address Tracker",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} overflow-x-hidden antialiased`}
      suppressHydrationWarning
    >
      <body className={`${rubik.className}`} suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

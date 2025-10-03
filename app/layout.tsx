import type { Metadata, Viewport } from "next";
import { Nunito, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import { Cursor } from "motion-plus/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru-gothic",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Aaryan Kapoor",
  description: "Design Engineer",
  icons: {
    icon: "/icon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "black",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${zenMaruGothic.variable} min-h-dvh antialiased select-none`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Cursor
            style={{
              backgroundColor: "var(--color-foreground)",
            }}
            spring={{ stiffness: 1500, damping: 150 }}
            variants={{
              pointer: { scale: 0.55 },
              default: { scale: 0.75 },
              text: { scale: 1, backgroundColor: "var(--color-foreground)" },
              pressed: { scale: 0.6 },
            }}
          />
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

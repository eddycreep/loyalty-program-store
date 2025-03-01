import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Nunito_Sans, Agdasima, Coda } from "next/font/google";
import { Toaster } from 'react-hot-toast';

import "../styles/theme.css";
import AppWrapper from "@/layout/mainLayout";
import { SessionProvider } from "@/context";
import { AuditProvider } from "@/shared/tools/auditMonit";
import { ThemeProvider } from "@/components/component/theme.provider"

// const inter = Inter({ subsets: ["latin"] });
const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "STORE-LOYALTY",
  description: "Setup specials, discounts, rewards and more for your customers",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <SessionProvider>
        <AuditProvider>
          <body className={`${nunito_sans.className} p-0 m-0 overflow-hidden bg-background`}>
            <AppWrapper>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>
                {children}
              </ThemeProvider>
              <Toaster
                position="bottom-center"
                reverseOrder={false}
              />
            </AppWrapper>
          </body>
        </AuditProvider>
      </SessionProvider>
    </html>
  );
}

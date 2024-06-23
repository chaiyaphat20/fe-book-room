import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type Props = {
  children: ReactNode
  params: { locale: string }
}
export default function RootLayout({
  children,
  params: { locale }
}: Props) {
  const messages = useMessages()
  return (
    <html lang={locale}>
      <body className={inter.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      </NextIntlClientProvider>
        </body>
    </html>
  );
}

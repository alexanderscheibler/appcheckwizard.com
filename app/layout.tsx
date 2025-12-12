import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AppCheckWizard - Senior Software Developer & QA Tester',
  description: 'Senior Software Developer and QA Tester, expertise in JavaScript, Python and Exploratory Testing for mobile applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/images/favicon/favicon.ico" sizes="any"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png"/>
      <link rel="manifest" type="application/manifest+json" href="/manifest.webmanifest"/>
    </head>
    <body
      className={`${montserrat.className}`}
    >
    {children}
    </body>
    </html>
  );
}

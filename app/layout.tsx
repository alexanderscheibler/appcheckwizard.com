import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import Script from "next/script";

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AppCheckWizard - Backend Developer & QA Tester',
  description: 'Backend developer and QA Tester, expertise in JavaScript, Python and Exploratory Testing for mobile applications.',
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
    <Script defer data-domain="appcheckwizard.com" src="https://plausible.io/js/script.js" id="plausible"></Script>
    </html>
  );
}

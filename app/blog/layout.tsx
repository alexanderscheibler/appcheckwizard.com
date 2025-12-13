import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google'
import '../globals.css';
import './blog.css';
import { Sidebar } from '@components/Blog/Sidebar'
import Head from '@components/Blog/Head';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AppCheckWizard | Blog - Senior Software Developer & QA Tester',
  description: 'Senior Software Developer and QA Tester, expertise in JavaScript, Python and Exploratory Testing for mobile applications.',
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Head />
    <body className={montserrat.className}>
    <div className="bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto md:ml-64">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
    </body>
    </html>
  )
}
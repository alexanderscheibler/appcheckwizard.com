import { Metadata } from 'next'

import Header from '@components/Header'
import Hero from '@components/Hero'
import Help from '@components/Help'
import Projects from '@components/Projects'
import Contact from '@components/Contact'
import Footer from '@components/Footer'

export const metadata: Metadata = {
  title: 'AppCheckWizard - Mobile testing for your app',
  description: 'Backend developer and QA Tester, expertise in JavaScript, Python and Exploratory Testing for mobile applications.',
}

export default function Home() {
  return (
      <main className="min-h-screen bg-gray-900 text-gray-100">
        <Header/>
        <Hero/>
        <Help/>
        <Projects/>
        <Contact/>
        <Footer/>
      </main>
  );
}

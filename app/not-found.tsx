import Link from 'next/link'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-6xl font-extrabold text-amber-400 tracking-tight">404</p>
        <h1 className="mt-4 text-3xl font-bold text-white text-balance">
          Page not found
        </h1>
        <p className="mt-3 text-gray-400 text-pretty max-w-sm">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved, deleted, or never existed.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/"
            className="rounded-lg border border-gray-700 hover:border-gray-500 transition-colors px-5 py-2.5 text-sm font-semibold text-gray-300"
          >
            Go to Home
          </Link>
          <Link
            href="/blog"
            className="rounded-lg bg-amber-200 hover:bg-amber-200 transition-colors px-5 py-2.5 text-sm font-semibold text-black"
          >
            Read the blog
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
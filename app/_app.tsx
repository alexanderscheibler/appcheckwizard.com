import React from 'react'
import type { AppProps } from 'next/app'
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script strategy="afterInteractive" id="plausible-script" src="/plausible.js" />
      <Script
        id="plausible"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
            plausible('pageview', { props: { website: 'appcheckwizard.com' } })
          `
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
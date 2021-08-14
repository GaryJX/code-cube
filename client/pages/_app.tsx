import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import '@/styles/globals.scss'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Code Code</title>
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default App

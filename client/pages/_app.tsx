import React, { useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import useServerAxios from '@/hooks/useServerAxios'
import '@/styles/globals.scss'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [serverAxios] = useServerAxios()

  useEffect(() => {
    // Ping server to wake it up in case of cold start
    serverAxios.get('/health')
  }, [])

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

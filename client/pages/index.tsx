import React, { useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading/Loading'
const Editor = dynamic(() => import('@/components/CodeEditor/CodeEditor'), {
  ssr: false,
})

const IndexPage: React.FC = () => {
  const router = useRouter()
  const [session, loading] = useSession()
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  if (!loading && !session) {
    router.push('/login')
    return null
  }

  // return <Loading />

  return (
    <>
      <div className="pane top-pane" suppressHydrationWarning={true}>
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="code-cube-sandbox"
          style={{ border: 'none' }}
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default IndexPage

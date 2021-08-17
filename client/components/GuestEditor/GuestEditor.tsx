import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { signOut } from 'next-auth/client'
import CodeEditor from '../CodeEditor/CodeEditor'
import useLocalStorage from '@/hooks/useLocalStorage'

const GuestEditor: React.FC = () => {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [packages, setPackages] = useLocalStorage(
    'packages',
    JSON.stringify([])
  )
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
    }, 500)

    return () => clearTimeout(timeout)
  }, [html, css, js, packages])

  return (
    <>
      <div className="pane top-pane" suppressHydrationWarning={true}>
        <CodeEditor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <CodeEditor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <CodeEditor
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

export default GuestEditor

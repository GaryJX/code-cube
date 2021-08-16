import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { signOut } from 'next-auth/client'
import CodeEditor from '../CodeEditor/CodeEditor'

export type EditorProps = {
  html: string
  css: string
  js: string
  packages: string[]
  update: (data: {
    html: string
    css: string
    js: string
    packages: string[]
  }) => void
}

const Editor: React.FC<EditorProps> = (props) => {
  const [html, setHtml] = useState(props.html)
  const [css, setCss] = useState(props.css)
  const [js, setJs] = useState(props.js)
  const [packages, setPackages] = useState(props.packages)
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
      props.update({
        html,
        css,
        js,
        packages,
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [html, css, js, packages])

  return (
    <>
      <div className="pane top-pane" suppressHydrationWarning={true}>
        <button onClick={() => signOut()}>Sign out </button>

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

export default Editor

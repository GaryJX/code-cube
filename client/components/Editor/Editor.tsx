import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { signOut } from 'next-auth/client'
import CodeEditor from '../CodeEditor/CodeEditor'
import NavBar from '../NavBar/NavBar'
import { Heading } from '@chakra-ui/react'

export type EditorProps = {
  name: string
  html: string
  css: string
  js: string
  packages: string[]
  update: (data: {
    name: string
    html: string
    css: string
    js: string
    packages: string[]
  }) => void
}

const Editor: React.FC<EditorProps> = (props) => {
  const [name, setName] = useState(props.name)
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
        name,
        html,
        css,
        js,
        packages,
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [name, html, css, js, packages])

  return (
    <>
      <NavBar>
        <Heading size="md">{name}</Heading>
      </NavBar>
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

export default Editor

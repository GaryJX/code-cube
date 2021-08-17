import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { signOut } from 'next-auth/client'
import CodeEditor from '../CodeEditor/CodeEditor'
import NavBar from '../NavBar/NavBar'
import { Heading } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'

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
  const [editingName, setEditingName] = useState(false)
  const [name, setName] = useState(props.name)
  const [html, setHtml] = useState(props.html)
  const [css, setCss] = useState(props.css)
  const [js, setJs] = useState(props.js)
  const [packages, setPackages] = useState(props.packages)
  const [srcDoc, setSrcDoc] = useState('')
  const nameContainerRef = useRef<HTMLInputElement | null>(null)

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

  useEffect(() => {
    if (editingName) {
      nameContainerRef.current?.focus()
    } else {
      if (name === '') {
        setName('Untitled')
      }
    }
  }, [editingName])

  useEffect(() => {
    nameContainerRef.current!.style.width = `calc(${name.length}ch - ${name.length}px)`
  }, [name])

  return (
    <>
      <NavBar autoSave>
        <input
          style={{
            background: 'transparent',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            minWidth: '2rem',
            maxWidth: '25rem',
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!editingName}
          ref={nameContainerRef}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              setEditingName(false)
            }
          }}
          onBlur={() => setEditingName(false)}
        />
        {!editingName && (
          <button onClick={() => setEditingName(true)}>
            <FiEdit />
          </button>
        )}
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

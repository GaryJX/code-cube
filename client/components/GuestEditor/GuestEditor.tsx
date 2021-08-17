import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { signOut } from 'next-auth/client'
import CodeEditor from '../CodeEditor/CodeEditor'
import useLocalStorage from '@/hooks/useLocalStorage'
import { Heading } from '@chakra-ui/react'
import NavBar from '../NavBar/NavBar'
import { FiEdit } from 'react-icons/fi'

const GuestEditor: React.FC = () => {
  const [editingName, setEditingName] = useState(false)
  const [name, setName] = useLocalStorage('name', '')
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [packages, setPackages] = useLocalStorage(
    'packages',
    JSON.stringify([])
  )
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
    }, 500)

    return () => clearTimeout(timeout)
  }, [html, css, js, packages])

  useEffect(() => {
    if (editingName) {
      nameContainerRef.current?.focus()
    }
  }, [editingName])

  useEffect(() => {
    let tempName = name
    if (tempName.length === 0) tempName = 'Untitled'
    nameContainerRef.current!.style.width = `calc(${tempName.length}ch - ${tempName.length}px)`
  }, [name])

  return (
    <>
      <NavBar autoSave logout={false}>
        <input
          style={{
            background: 'transparent',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            minWidth: '2rem',
            maxWidth: '25rem',
          }}
          value={name || 'Untitled'}
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

export default GuestEditor

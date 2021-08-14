import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { useState } from 'react'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FaCompressAlt, FaExpandAlt } from 'react-icons/fa'

type EditorProps = {
  displayName: string
  language: 'xml' | 'javascript' | 'css'
  value: string
  onChange: (value: string) => void
}

const Editor: React.FC<EditorProps> = (props) => {
  const { displayName, language, value, onChange } = props
  const [open, setOpen] = useState(true)

  const handleChange = (editor: any, data: any, value: any) => {
    onChange(value)
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-collapse-button"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <FaCompressAlt /> : <FaExpandAlt />}
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          link: true,
          mode: language,
          theme: 'material-darker',
          lineNumbers: true,
        }}
      />
    </div>
  )
}

export default Editor

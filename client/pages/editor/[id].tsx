import React, { useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'

const CubeEditorPage: React.FC = () => {
  const [value, setValue] = useState('')
  return (
    <div>
      Hello
      <CodeMirror
        value={value}
        onBeforeChange={(editor, data, value) => {
          console.log({ editor, data, value })
          setValue(value)
        }}
      />
    </div>
  )
}

export default CubeEditorPage

import React, { useState } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)
import 'highlight.js/styles/atom-one-dark.css'

import ReactQuill from 'react-quill'
import Highlight from 'react-highlight'
import 'react-quill/dist/quill.snow.css'

const EditorV2 = () => {
  const [value, setValue] = useState('')

  return (
    <>
      {/* <Highlight className="javascript">
        {value}
      </Highlight> */}
      <ReactQuill
        theme=""
        value={value}
        onChange={setValue}
        modules={{ toolbar: ['code-block'], syntax: true }}
      />
    </>
  )
}

export default EditorV2

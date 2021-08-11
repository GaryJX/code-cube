import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const EditorV2 = () => {
  const [value, setValue] = useState('')

  return <ReactQuill theme="" value={value} onChange={setValue} />
}

export default EditorV2

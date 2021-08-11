import React from 'react'
import dynamic from 'next/dynamic'
const Editor = dynamic(() => import('@/components/EditorV2'), { ssr: false })

const indexV2Page = () => {
  return <Editor />
}

export default indexV2Page

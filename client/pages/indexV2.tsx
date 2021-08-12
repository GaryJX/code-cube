import React from 'react'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import axios from 'axios'
const Editor = dynamic(() => import('@/components/EditorV2'), { ssr: false })

const IndexV2Page: React.FC = () => {
  useEffect(() => {
    axios
      .get('https://code-cube-api.herokuapp.com/api')
      .then((response) => console.log(response))
      .catch((error) => console.error(error))
  }, [])
  return <Editor />
}

export default IndexV2Page

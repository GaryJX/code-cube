import React, { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import Loading from '@/components/Loading/Loading'
import useServerAxios from '@/hooks/useServerAxios'
import dynamic from 'next/dynamic'
import type { EditorProps } from '@/components/Editor/Editor'
const Editor = dynamic(() => import('@/components/Editor/Editor'), {
  ssr: false,
})

const CubeEditorPage: React.FC = () => {
  const [session, sessionLoading] = useAuth()
  const [serverAxios, axiosLoading] = useServerAxios()
  // TODO: Look into implementing the useApiResource hook I made for TI
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<EditorProps>({
    html: '',
    css: '',
    js: '',
    packages: [],
  })

  useEffect(() => {
    if (!axiosLoading) {
      // serverAxios.get("/api/").then(() => setLoading(false))
    }
  }, [axiosLoading])

  if (sessionLoading || loading) {
    return <Loading />
  }

  return (
    <Editor
      html={data.html}
      css={data.css}
      js={data.js}
      packages={data.packages}
    />
  )
}

export default CubeEditorPage

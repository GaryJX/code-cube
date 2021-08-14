import React from 'react'
import useAuth from '@/hooks/useAuth'
import Loading from '@/components/Loading/Loading'
import Editor from '@/components/Editor/Editor'

const CubeEditorPage: React.FC = () => {
  const [session, loading] = useAuth()

  if (loading) {
    return <Loading />
  }

  return <Editor />
}

export default CubeEditorPage

import React, { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import Loading from '@/components/Loading/Loading'
import useServerAxios from '@/hooks/useServerAxios'
import dynamic from 'next/dynamic'
import type { EditorProps } from '@/components/Editor/Editor'
import { useRouter } from 'next/dist/client/router'
const Editor = dynamic(() => import('@/components/Editor/Editor'), {
  ssr: false,
  loading() {
    return <Loading />
  },
})

const CubeEditorPage: React.FC = () => {
  const router = useRouter()
  const [session, sessionLoading] = useAuth()
  const [serverAxios, axiosLoading] = useServerAxios()
  // TODO: Look into implementing the useApiResource hook I made for TI
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<{
    name: string
    html: string
    css: string
    js: string
    packages: string[]
  }>({
    name: '',
    html: '',
    css: '',
    js: '',
    packages: [],
  })

  useEffect(() => {
    if (!axiosLoading && router.isReady) {
      console.log('@@ FETCHING DATA')
      serverAxios
        .get(`/api/cube/${router.query.id}`)
        .then((response) => {
          console.log({ data: response.data })
          const {
            name = 'Untitled',
            html = '',
            css = '',
            js = '',
            packages = [],
          } = response.data

          setData({
            name,
            html,
            css,
            js,
            packages,
          })
          setLoading(false)
        })
        .catch((error) => {
          console.error({ error })
        })
    }
  }, [axiosLoading, router])

  const updateData = (data: {
    name: string
    html: string
    css: string
    js: string
    packages: string[]
  }) => {
    console.log({ data })

    setData(data)
    serverAxios
      .put(`/api/cube/${router.query.id}`, data)
      .then((response) => {
        console.log({ responseData: response.data })
      })
      .catch((error) => {
        console.error({ error })
      })
  }

  if (sessionLoading || loading) {
    return <Loading />
  }

  return (
    <Editor
      name={data.name}
      html={data.html}
      css={data.css}
      js={data.js}
      packages={data.packages}
      update={updateData}
    />
  )
}

export default CubeEditorPage

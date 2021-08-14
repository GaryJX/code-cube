import React, { useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading/Loading'
import useAuth from '@/hooks/useAuth'
import useServerAxios from '@/hooks/useServerAxios'
import Layout from '@/components/Layout/Layout'
const Editor = dynamic(() => import('@/components/CodeEditor/CodeEditor'), {
  ssr: false,
})

const IndexPage: React.FC = () => {
  const [session, sessionLoading] = useAuth()
  // TODO: Look into implementing the useApiResource hook I made for TI
  const [serverAxios, axiosLoading] = useServerAxios()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (!axiosLoading) {
      serverAxios
        .get('/api/cubes')
        .then((response) => {
          console.log({ data: response.data })
          setData(response.data)
          setLoading(false)
        })
        .catch((error) => {
          console.error({ error })
        })
    }
  }, [axiosLoading])

  if (sessionLoading || loading) {
    return <Loading />
  }

  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}

export default IndexPage

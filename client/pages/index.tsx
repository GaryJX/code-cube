import React, { useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading/Loading'
import useAuth from '@/hooks/useAuth'
import useServerAxios from '@/hooks/useServerAxios'
import Layout from '@/components/Layout/Layout'

type Cube = {
  _id: string
  creatorID: string
  created: string
  updated: string
  name: string
  html?: string
  css?: string
  js?: string
  packages?: string[]
}

const IndexPage: React.FC = () => {
  const [session, sessionLoading] = useAuth()
  // TODO: Look into implementing the useApiResource hook I made for TI
  const [serverAxios, axiosLoading] = useServerAxios()
  const [loading, setLoading] = useState(true)
  const [cubes, setCubes] = useState<Cube[]>([])

  useEffect(() => {
    if (!axiosLoading) {
      serverAxios
        .get('/api/cubes')
        .then((response) => {
          console.log({ data: response.data })
          setCubes(response.data)
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
      <div>
        <div>
          <button>Create New Cube</button>
        </div>
        {cubes.map((cube) => (
          <div>
            <a href={`/editor/${cube._id}`}>
              <h2>Title: {cube.name}</h2>
            </a>
            <p>Created: {cube.created}</p>
            <p>Updated: {cube.updated}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

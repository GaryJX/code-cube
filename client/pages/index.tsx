import React, { useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading/Loading'
import useAuth from '@/hooks/useAuth'
import useServerAxios from '@/hooks/useServerAxios'
import Layout from '@/components/Layout/Layout'

export type Cube = {
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

  const handleDelete = (cubeID: string) => {
    if (window.confirm('Are you sure you want to delete this cube?')) {
      serverAxios
        .delete(`/api/cube/${cubeID}`)
        .then((response) => {
          console.log({ data: response.data })
        })
        .catch((error) => {
          console.error({ error })
        })
    }
  }

  const createNewCube = () => {
    // TODO: Create a new Untitled Cube and redirect to that page
    serverAxios.post('/api/cube', {})
  }

  if (sessionLoading || loading) {
    return <Loading />
  }

  return (
    <Layout>
      <div>
        <div>
          <button onClick={createNewCube}>Create New Cube</button>
        </div>
        {cubes.map((cube) => (
          <div key={cube._id}>
            <a href={`/editor/${cube._id}`}>
              <h2>Title: {cube.name}</h2>
            </a>
            <p>Created: {cube.created}</p>
            <p>Updated: {cube.updated}</p>
            <button onClick={() => handleDelete(cube._id)}>Delete Cube</button>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

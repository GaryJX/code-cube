import React, { useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading/Loading'
import useAuth from '@/hooks/useAuth'
import useServerAxios from '@/hooks/useServerAxios'
import Layout from '@/components/Layout/Layout'
import {
  Box,
  Button,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import NextLink from 'next/link'

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
  const router = useRouter()

  useEffect(() => {
    if (!axiosLoading && !sessionLoading) {
      serverAxios
        .get('/api/cubes')
        .then((response) => {
          console.log({ data: response.data })
          setCubes(response.data || [])
          setLoading(false)
        })
        .catch((error) => {
          console.error({ error })
        })
    }
  }, [axiosLoading, sessionLoading])

  const handleDelete = (cubeID: string) => {
    if (window.confirm('Are you sure you want to delete this cube?')) {
      serverAxios
        .delete(`/api/cube/${cubeID}`)
        .then((response) => {
          console.log({ data: response.data })
          setCubes((prevCubes) =>
            prevCubes.filter((cube) => cube._id !== cubeID)
          )
        })
        .catch((error) => {
          console.error({ error })
        })
    }
  }

  const createNewCube = () => {
    serverAxios
      .post('/api/cube', { name: 'Untitled' })
      .then((response) => {
        const newCubeID = response.data.InsertedID
        router.push(`/editor/${newCubeID}`)
      })
      .catch((error) => {
        console.error({ error })
      })
  }

  if (sessionLoading || loading) {
    return <Loading />
  }

  return (
    <Layout>
      <Box padding="2rem 5rem">
        <Button onClick={createNewCube} colorScheme="blue" marginBottom="1rem">
          Create New Cube
        </Button>
        <Table>
          <Thead>
            <Tr>
              <Th color="white">Title</Th>
              <Th color="white" width="1px">
                Created
              </Th>
              <Th color="white" width="1px">
                Last Updated
              </Th>
              <Th width="1px"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {cubes.length > 0 ? (
              cubes.map((cube) => (
                <Tr>
                  <Td>
                    <NextLink href={`/editor/${cube._id}`}>
                      <Link color="blue.300">{cube.name}</Link>
                    </NextLink>
                  </Td>
                  <Td whiteSpace="nowrap">
                    {new Intl.DateTimeFormat('en-US', {
                      dateStyle: 'long',
                    }).format(new Date(cube.created))}
                  </Td>
                  <Td whiteSpace="nowrap">
                    {new Intl.DateTimeFormat('en-US', {
                      dateStyle: 'long',
                    }).format(new Date(cube.updated))}
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(cube._id)}
                    >
                      Delete Cube
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={4}>
                  No cubes found.{' '}
                  <button onClick={createNewCube}>
                    <Link color="blue.300">Create a new cube</Link>
                  </button>
                  .
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Layout>
  )
}

export default IndexPage

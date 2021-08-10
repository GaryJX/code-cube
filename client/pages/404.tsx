import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'

const Error404Page: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/')
  }, [])
  return null
}

export default Error404Page

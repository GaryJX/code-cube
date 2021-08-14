import { useMemo } from 'react'
import axios, { AxiosInstance } from 'axios'
import { useSession } from 'next-auth/client'
import Config from '@/config/config'
import type { AuthSession } from '@/hooks/useAuth'

const useServerAxios = (): [AxiosInstance, boolean] => {
  const [session, loading] = useSession()
  console.log({ session, loading })
  const serverAxiosInstance = useMemo(() => {
    const axiosInstance = axios.create({ baseURL: Config.backendApiURL })

    // If session is present, then add Authorization headers
    if (!loading && session) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${
        (session as AuthSession).accessToken
      }`
    }

    return axiosInstance
  }, [session, loading])

  return [serverAxiosInstance, loading]
}

export default useServerAxios

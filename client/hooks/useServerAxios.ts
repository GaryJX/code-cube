import { useMemo } from 'react'
import axios from 'axios'
import Config from '@/config/config'

export const useServerAxios = (accessToken: string = '') => {
  const serverAxiosInstance = useMemo(() => {
    const axiosInstance = axios.create({ baseURL: Config.backendApiURL })
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`
    return axiosInstance
  }, [accessToken])

  return serverAxiosInstance
}

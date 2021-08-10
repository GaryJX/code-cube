import Config from '@/config/config'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: Config.backendApiURL,
})

export const useAxios = (accessToken: string) => {
  console.log({
    accessToken,
    baseURL: Config.backendApiURL,
  })
  const axiosInstance = axios.create({
    baseURL: Config.backendApiURL,
  })

  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`

  return axiosInstance
}

export default axiosInstance

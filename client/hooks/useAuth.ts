import { useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { Session } from 'next-auth'
import useLocalStorage from './useLocalStorage'

export type AuthSession = Session & {
  accessToken: string
  expires: string
}

const useAuth = (): [AuthSession | null, boolean] => {
  const router = useRouter()
  const [session, loading] = useSession()
  const [value, setValue] = useLocalStorage('login-redirect', '')
  const isLoading = loading || !router.isReady

  useEffect(() => {
    if (router.isReady) {
      if (!loading && !session) {
        setValue(router.asPath)
        router.push('/login')
      }
    }
  }, [router, session, loading])

  return [session as AuthSession, isLoading || !session]
}

export default useAuth

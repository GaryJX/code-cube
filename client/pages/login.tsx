import { useEffect, useRef } from 'react'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import Loading from '@/components/Loading/Loading'
import useLocalStorage from '@/hooks/useLocalStorage'

const LoginPage: React.FC = () => {
  const router = useRouter()
  const [session, loading] = useSession()
  const [redirect, setRedirect] = useLocalStorage('login-redirect', '')
  const redirectRef = useRef('/')

  useEffect(() => {
    if (redirect) {
      redirectRef.current = redirect
    }
  }, [redirect])

  useEffect(() => {
    if (!loading && router.isReady) {
      if (session) {
        router.push(redirectRef.current)
        setRedirect('')
      }
    }
  }, [router, session, loading])

  if (loading || session) {
    return <Loading />
  }

  // TODO: Build Login/Signup modal
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('github')}>Sign in</button>
    </>
  )
}

export default LoginPage

// TODO: Delete this logic eventually
export const getStaticProps = async () => {
  // const { db } = await connectToDatabase()
  // const user = await db.collection('users').findOne({ name: 'Gary Xie' })
  return { props: { user: JSON.parse(JSON.stringify({ name: 'Gary Xie' })) } }
}

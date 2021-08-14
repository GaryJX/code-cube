import { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { connectToDatabase } from 'util/db'
import { useAxios } from '@/util/axiosConfig'

const LoginPage: React.FC<any> = ({ user }) => {
  const [session, loading] = useSession()
  const axios = useAxios((session as any)?.accessToken || '')

  useEffect(() => {
    // Example to connect to backend server
    axios
      .get('/api')
      .then((response) => {
        console.log({ data: response.data })
      })
      .catch((err) => {
        console.error({ err: err.response })
      })
  }, [axios])

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn('github')}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user?.name} <br />
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
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

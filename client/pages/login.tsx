import React, { useEffect, useRef } from 'react'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import Loading from '@/components/Loading/Loading'
import useLocalStorage from '@/hooks/useLocalStorage'
import {
  Container,
  Flex,
  Heading,
  Button,
  Text,
  Tooltip,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import SignInButton from '@/components/SignInButton/SignInButton'

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
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Container
        boxShadow="md"
        backgroundColor="#303030"
        borderRadius="base"
        padding="2rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gridGap="1rem"
      >
        <Heading>Code Cube</Heading>
        <SignInButton provider="github" />
        <SignInButton provider="google" />
        <NextLink href="/editor/guest">
          <Link>
            <Tooltip label="Guest users can use the code editor, but your data will only be saved to your local machine.">
              Try out the code editor as a guest
            </Tooltip>
          </Link>
        </NextLink>
      </Container>
    </Flex>
  )
}

export default LoginPage

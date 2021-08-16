import React from 'react'
import { Button } from '@chakra-ui/react'
import { signIn, signOut } from 'next-auth/client'

type SignInButtonProps = {
  provider: string
}

const SignInButton: React.FC<SignInButtonProps> = ({ provider }) => {
  const testSignIn = () => {
    signIn('github')
      .then((response) => console.log({ data: response }))
      .catch((error) => console.error({ error }))
  }
  return (
    <Button
      borderRadius="base"
      backgroundColor="#444444"
      width="full"
      _hover={{
        backgroundColor: '#555555',
      }}
      onClick={() => testSignIn()}
    >
      Sign in with {provider}
    </Button>
  )
}

export default SignInButton

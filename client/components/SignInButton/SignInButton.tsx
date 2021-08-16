import React from 'react'
import { Button } from '@chakra-ui/react'
import { signIn } from 'next-auth/client'

type SignInButtonProps = {
  provider: string
}

const SignInButton: React.FC<SignInButtonProps> = ({ provider }) => {
  return (
    <Button
      borderRadius="base"
      backgroundColor="#444444"
      width="full"
      _hover={{
        backgroundColor: '#555555',
      }}
      onClick={() => signIn('github')}
    >
      Sign in with {provider}
    </Button>
  )
}

export default SignInButton

import { Box, Button, Flex } from '@chakra-ui/react'
import { signOut } from 'next-auth/client'
import React from 'react'
import Link from 'next/link'
import { FaRegCheckCircle } from 'react-icons/fa'

const NavBar: React.FC<{ autoSave?: boolean; logout?: boolean }> = ({
  children,
  autoSave = false,
  logout = true,
}) => {
  return (
    <Flex justifyContent="space-between" padding="0.5rem 1rem">
      <Flex alignItems="center" gridGap="1rem">
        <Link href="/">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 0l-11 6v12.131l11 5.869 11-5.869v-12.066l-11-6.065zm7.91 6.646l-7.905 4.218-7.872-4.294 7.862-4.289 7.915 4.365zm-16.91 1.584l8 4.363v8.607l-8-4.268v-8.702zm10 12.97v-8.6l8-4.269v8.6l-8 4.269zm-8-9.601l4 2.182v4.085l-4-2.134v-4.133zm14 .067v4.066l-4 2.134v-4.066l4-2.134zm-7.01-7.104l3.726 2.055-3.7 1.974-3.706-2.021 3.68-2.008z" />
            </svg>
          </a>
        </Link>
        {children}
      </Flex>
      <Flex alignItems="center" gridGap="1rem">
        {autoSave && (
          <Flex alignItems="center" gridGap="0.5rem" paddingY="0.5rem">
            <FaRegCheckCircle />
            Auto saved
          </Flex>
        )}
        {logout && (
          <Button
            onClick={() => signOut()}
            backgroundColor="#444444"
            _hover={{
              backgroundColor: '#555555',
            }}
          >
            Log Out
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default NavBar

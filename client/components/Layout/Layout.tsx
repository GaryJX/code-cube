import React from 'react'
import NavBar from '@/components/NavBar/NavBar'
import { Heading } from '@chakra-ui/react'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar>
        <Heading size="md">Code Cube</Heading>
      </NavBar>
      {children}
    </>
  )
}

export default Layout

import React from 'react'
import NavBar from '@/components/NavBar/NavBar'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default Layout

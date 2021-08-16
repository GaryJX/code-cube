import { signOut } from 'next-auth/client'
import React from 'react'

const NavBar = () => {
  return (
    <div>
      NavBar
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  )
}

export default NavBar

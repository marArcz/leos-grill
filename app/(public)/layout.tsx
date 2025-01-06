import React from 'react'
import Navbar from '../ui/Navbar'
import { Toaster } from '@/components/ui/toaster'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main>
        <Navbar/>
        {children}
        <Toaster />
    </main>
  )
}

export default Layout
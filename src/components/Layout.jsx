import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'


// const Layout = ({ children }) => {
//   return (
//     <div className='wrapper'>
//         {children}
//         <Footer />
//     </div>
//   )
// }
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className='wrapper'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout




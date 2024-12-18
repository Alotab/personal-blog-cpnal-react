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
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  return (
    <div className='wrapper'>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster 
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        toastOptions={{
          style: {
            backgroundColor: "green",
            color: "white",
          },
        }}
      />
    </div>
  )
}

export default Layout




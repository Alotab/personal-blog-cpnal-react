import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Portfolio from './components/Portfolio.tsx'
import CreatePost from './components/CreatePost.tsx'
import { 
  Outlet, 
  RouterProvider, 
  ScrollRestoration, 
  createBrowserRouter 
} from 'react-router-dom'


const RouterLayout = () => {
  return (
   <>
      <ScrollRestoration />
      <Outlet />
   </>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/create-post",
        element: <CreatePost />,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

  <RouterProvider router={router}/>
)

// .create-post-container
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Portfolio from './components/Portfolio.jsx'
import CreatePost from './components/CreatePost.jsx'
import { 
  Outlet, 
  RouterProvider, 
  ScrollRestoration, 
  createBrowserRouter 
} from 'react-router-dom'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Layout from './components/Layout.jsx'
import PostDetail from './components/PostDetail.jsx'


const RouterLayout = () => {
  return (
   <>
      <Layout>
        <ScrollRestoration />
        <Outlet />
      </Layout>
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
        path: "/posts/:slug/:id",
        element: <PostDetail />,
      },
      {
        path: "/create-post",
        element: <CreatePost />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
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
import Homepage from "./components/Homepag."
import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Portfolio from "./components/Portfolio";
import Profile from "./components/Profile";
import EditorBox from "./components/EditorBox";
import PostDetail from "./components/PostDetail";
import PostEdit from "./components/PostEdit";
import PageNotFound from "./components/PageNotFound";
import RequireAuth from "./components/RequireAuth";
import NotAuthorized from "./components/NotAuthorized";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/posts/:slug/:id" element={<PostDetail />} />
          <Route path="/auth/posts/:slug/:id" element={<PostEdit />} />
          <Route path="/page-not-authorzed" element={<NotAuthorized />}/>
          {/* <Route path="create-post" element={<EditorBox />} /> */}
          
          {/* Protected Routes  */}
          <Route path="create-post" 
            element={
              <RequireAuth>
                <EditorBox />
              </RequireAuth>
            } 
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
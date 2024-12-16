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




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path="register" element={<Register />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-post" element={<EditorBox />} />
          <Route path="/posts/:slug/:id" element={<PostDetail />} />
          <Route path="/auth/posts/:slug/:id" element={<PostEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
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
          {/* <Route path="logout" element={<Logout />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
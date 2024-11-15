import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from '@/pages/Signin';
import Signup from './pages/Signup';
import Layout from './layout';
import Home from './pages/Home';
import SearchHandler from './pages/Search';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path='home' element={<Home />} />
          <Route path='search' element={<SearchHandler />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}
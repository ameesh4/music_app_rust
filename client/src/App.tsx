import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '@/pages/Main';
import Signin from '@/pages/Signin';
import Signup from './pages/Signup';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}
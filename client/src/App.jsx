import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingUp from './pages/SingUp';
import SingIn from './pages/SingIn';
import Profile from './pages/Profile';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/sign-up' element={<SingUp />} />
        <Route path='/sign-in' element={<SingIn />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

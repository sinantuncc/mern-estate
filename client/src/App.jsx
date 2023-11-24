import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingUp from './pages/SingUp';
import SingIn from './pages/SingIn';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-up' element={<SingUp />} />
        <Route path='/sign-in' element={<SingIn />} />
        <Route path='/profile' element={<PrivateRoute />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

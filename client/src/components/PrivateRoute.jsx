import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile from '../pages/Profile';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Profile /> : <Navigate to={'/sign-in'} />;
}

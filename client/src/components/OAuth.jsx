import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      const res = await axios.post('/api/auth/google', userData);
      dispatch(signInSuccess(res.data));
      navigate('/');
    } catch (error) {
      console.log('could not with google', error);
    }
  };
  return (
    <button
      type='button'
      className='bg-red-500 p-3 rounded-lg text-white uppercase hover:opacity-95'
      onClick={handleGoogle}
    >
      contiune with google
    </button>
  );
}

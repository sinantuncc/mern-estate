import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice.js';

export default function SingUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await axios.post('/api/auth/signin', formData);
      dispatch(signInSuccess(res.data));
      navigate('/');
    } catch (err) {
      dispatch(signInFailure(err.response.data.message));
    }
  };
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-center text-3xl my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='username or email'
          className='border p-3 rounded-lg focus:outline-none'
          id='usernameOrEmail'
          onChange={handleChange}
          required
        />

        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg focus:outline-none'
          id='password'
          onChange={handleChange}
          required
        />
        <button
          type='submit'
          className='bg-slate-700 p-3 uppercase text-white rounded-lg hover:opacity-95 disabled:opacity-80'
          disabled={loading}
        >
          {loading ? 'loading...' : 'sign in'}
        </button>
      </form>
      <div className='flex gap-3 my-5'>
        <p>Have a Account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

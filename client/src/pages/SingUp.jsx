import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SingUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('/api/auth/signup', formData);
      console.log('res: ', res);
      const { data } = res;

      if (data?.success === false) setError(data.message);

      navigate('/sign-in');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-center text-3xl my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg focus:outline-none'
          id='username'
          onChange={handleChange}
          required
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg focus:outline-none'
          id='email'
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
          {loading ? 'loading...' : 'sign up'}
        </button>
      </form>
      <div className='flex gap-3 my-5'>
        <p>Have a Account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
    </div>
  );
}

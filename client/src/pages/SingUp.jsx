import { Link } from 'react-router-dom';

export default function SingUp() {
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-center text-3xl my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg focus:outline-none'
          id='username'
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg focus:outline-none'
          id='email'
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg focus:outline-none'
          id='password'
        />
        <button
          type='submit'
          className='bg-slate-700 p-3 uppercase text-white rounded-lg'
        >
          sign up
        </button>
      </form>
      <div className='flex gap-3 my-5'>
        <p>Have a Account?</p>
        <Link>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
    </div>
  );
}

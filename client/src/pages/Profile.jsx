import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img
          src={currentUser.avatar}
          alt='profile'
          className='w-24 h-24 rounded-full self-center cursor-pointer object-cover mt-2'
        />
        <input
          type='text'
          id='username'
          placeholder='username'
          className='border p-3 rounded-lg focus:outline-none'
        />
        <input
          type='email'
          id='email'
          placeholder='email'
          className='border p-3 rounded-lg focus:outline-none'
        />{' '}
        <input
          type='password'
          id='password'
          placeholder='password'
          className='border p-3 rounded-lg focus:outline-none'
        />
        <button
          type='submit'
          className='bg-slate-700 p-3 uppercase text-white rounded-lg hover:opacity-95 disabled:opacity-80'
          disabled={loading}
        >
          {loading ? 'loading...' : 'update'}
        </button>
      </form>
      <div className='flex flex-col justify-between my-5 gap-3 sm:flex-row'>
        <button
          type='button'
          className='bg-red-500 p-3 text-white rounded-lg hover:opacity-95 disabled:opacity-80 flex-1'
        >
          Delete Account
        </button>
        <button
          type='button'
          className='bg-red-500 p-3 text-white rounded-lg hover:opacity-95 disabled:opacity-80 flex-1'
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

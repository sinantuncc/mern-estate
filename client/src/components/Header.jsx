import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex max-w-6xl mx-auto justify-between items-center p-3'>
        <Link to={'/'}>
          <h1 className='font-bold text-sm sm:text-2xl cursor-pointer  '>
            <span className='text-slate-700'>Tunc</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>

        <form className='flex items-center bg-slate-100 rounded-md p-3'>
          <input
            type='text'
            placeholder='Search'
            className='bg-transparent focus:outline-none w-14 sm:w-64'
          />
          <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex gap-4'>
          <Link to={'/'}>
            <li className='hidden sm:inline text-slate-700 cursor-pointer hover:underline'>
              Home
            </li>
          </Link>
          <Link to={'/about'}>
            <li className='hidden sm:inline text-slate-700 cursor-pointer hover:underline'>
              About
            </li>
          </Link>

          {currentUser ? (
            <Link to={'/profile'}>
              <img
                src={currentUser.avatar}
                alt='profile'
                className='h-7 w-7 rounded-full object-cover'
              />
            </Link>
          ) : (
            <Link to={'/sign-in'}>
              <li className=' text-slate-700 cursor-pointer hover:underline'>
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [file, setFiles] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  /*
  firebase storage rules
  allow read;
  allow write: if 
  request.resource.size < 2 * 1024 *1024 &&
  request.resource.contentType.matches('image/.*')
  */

  useEffect(() => {
    if (file) {
      setFileUploadError(false);
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },

      (error) => {
        return setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setFiles(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='w-24 h-24 rounded-full self-center cursor-pointer object-cover mt-2'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Failure to upload images (file size must be smaller than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>Uploading {filePerc}%</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>
              Image uploading is successfully.
            </span>
          ) : (
            ''
          )}
        </p>
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
        />
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
      <div className='flex flex-col justify-between my-4 gap-3 sm:flex-row'>
        <button
          type='button'
          className='bg-red-500 p-2 text-white rounded-lg hover:opacity-95 disabled:opacity-80 flex-1'
        >
          Delete Account
        </button>
        <button
          type='button'
          className='bg-red-500 p-2 text-white rounded-lg hover:opacity-95 disabled:opacity-80 flex-1'
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

import { useSelector } from 'react-redux';

export default function CreateListing() {
  const { loading } = useSelector((state) => state.user);
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='font-semibold text-center text-3xl my-7'>
        Create a Listing
      </h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            minLength={10}
            maxLength={62}
            required
          />
          <textarea
            type='textarea'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type='checkbox' id='sell' className='w-5' />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5' />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-4 flex-wrap'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min={1}
                max={10}
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min={1}
                max={10}
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                required
                min={0}
                className='p-3 border border-gray-300 rounded-lg w-32'
              />
              <div className='flex flex-col items-center'>
                Regular Price
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountPrice'
                min={0}
                required
                className='p-3 border border-gray-300 rounded-lg w-32'
              />
              <div className='flex flex-col items-center'>
                Discounted Price
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 flex-1'>
          <p className='font-semibold'>
            Images:{' '}
            <span className='font-normal'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              type='file'
              accept='image/*'
              multiple
              className='p-3 border border-gray-300  rounded w-full'
            />
            <button
              type='button'
              className='p-3 border border-green-700 text-green-700 rounded uppercase hover:shadow-lg disabled: opacity-80'
            >
              upload
            </button>
          </div>
          <button
            disabled={loading}
            className='bg-slate-700 p-3 uppercase text-white rounded-lg hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'loading...' : 'create listing'}
          </button>
        </div>
      </form>
    </main>
  );
}

// Searchbar.js
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Searchbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  async function search(e) {
    e.preventDefault();
    router.push(`/searchresults?search=${searchQuery}`);
  }

  function clear() {
    setSearchQuery('');
  }

  return (
    <div className='w-full'>
      <div className='flex justify-center'>
        <div className="flex flex-col p-2 py-3 md:w-7/12 w-full">
          <div className="items-center justify-between flex rounded-xl border-1 bg-white top-5">
            <input
              className="font-semibold rounded-xl w-full py-1 pl-4 text-gray-700 bg-white focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="What do you want ?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div>
              {searchQuery ? (
                <button onClick={clear} className="p-1 mr-1 rounded-xl hover:bg-gray-100 cursor-pointer">
                  {/* Clear button icon */}X
                </button>
              ) : ''}
            </div>
            <button disabled={searchQuery ? false : true} onClick={search} className="bg-red-500 p-3 hover:bg-red-600 cursor-pointer ms-2 rounded-r-lg"> <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" > <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /> </svg> </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;

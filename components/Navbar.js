// Navbar.js
import React from 'react';
import Link from 'next/link';
import Searchbar from './Searchbar';
import Image from 'next/image';

const Navbar = () => {


  return (
    <header className="text-gray-600 body-font top-0 bg-gray-100 block">
      <div className="container mx-auto flex flex-wrap md:flex-row justify-between items-center">
        <Link href="/" className="flex title-font justify-center font-medium items-center text-gray-900 md:mb-0">
          <Image src={"/logo_3000x1024.png"} height={165} width={165} alt="Logo_RoboX" />
        </Link>

        <Link  className='md:hidden block' href={"/myaccount"}> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-person-circle mx-2" viewBox="0 0 16 16"> <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /> <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" /> </svg> </Link> 
        <nav className="md:ml-auto flex-grow md:text-lg text-base text-center justify-center mb-4 lg:mb-0">
          <Searchbar />
        </nav>

      <Link className='md:block hidden' href={"/myaccount"}> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-person-circle mx-2" viewBox="0 0 16 16"> <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /> <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" /> </svg> </Link> 
      </div>

      <Link href={"/cart"} className="fixed bottom-10  right-8 p-4 rounded-full bg-red-500 text-white z-20" ><svg xmlns="http://www.w3.org/2000/svg" width="" height="" fill="currentColor" className="bi bi-cart-fill w-5 md:w-8" viewBox="0 0 16 16" > <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /></svg> </Link> 
    </header>
  );
};

export default Navbar;

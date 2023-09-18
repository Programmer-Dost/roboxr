"use client"

import AddToCart from '@/functions/Addtocart';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function ProductBox({ productName, productPrice, productTags, productImage, productId }) {
const router = useRouter();
const [Msg, setMsg] = useState('Add to Cart')

const addtocart =()=>{
  AddToCart(productId)
  setMsg("Added to cart")
  setTimeout(() => {
    setMsg("Add to Cart")
  }, 2000);
}

  return (
    <div className="lg:w-1/4 md:w-1/3 w-72 cursor-pointer">
        <div key={'index'} className="card-container relative flex flex-col overflow-hidden rounded border-2 bg-white p-4 transition-all duration-300 hover:border-red-500 justify-between m-2 h-96">
                <div className="btn-wishlist absolute right-2 top-2 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary transition-transform duration-300 ease-in-out hover:rotate-360">
                  <i className="bi bi-heart pointer-events-none flex text-lg text-white"></i>
                </div>
                <div className="absolute left-0 top-0 rounded-br bg-red-500 px-2 py-1 uppercase text-white">
                  <span>50% off</span>
                </div>
                <div className="h-64">
                  <Link  href={`/product?id=${productId}`}>
                    <Image height={500} width={500} className="object-cover h-full w-full" src={productImage} alt="img" />
                  </Link>
                </div>
                <div className="flex flex-col gap-2 justify-end ">
                  <div>
                  <a className="clamp text-lg font-bold transition-all duration-300 hover:text-primary" href="#">
                    {productName.slice(0, 20)}..
                  </a>
                  <p className="clamp-3">
                    {/* {  productDescription.slice(0, 70)}.... */}
                  </p>
                  <div className="mt-auto flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">₹{  productPrice}</span>
                    <span className="text-sm line-through">₹{  productPrice * 2}</span>
                  </div>
                  </div>

                </div>
                  <button onClick={addtocart} className="flex w-full items-center justify-center gap-2 rounded bg-red-500 p-2 font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-red-600" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                      ></path>
                    </svg>
                    <span>{Msg}</span>
                  </button>
              </div>

    </div>
  )
}

export default ProductBox
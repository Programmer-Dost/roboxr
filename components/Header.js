"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import Marquee from "react-fast-marquee";
import ProductBox from './ProductBox'
import Typewriter from "typewriter-effect";
import AddToCart from '@/functions/Addtocart'
import Spinner from './Spinner'

const Header = () => {

  const [Products, setProducts] = useState([])
  const [FeaturedProducts, setFeaturedProducts] = useState([])
  const [Loading, setLoading] = useState(false)
  async function fetchProducts() {
    setLoading(true)
    const response = await fetch(`/api/getproducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log("Success:", result.product);
    setProducts(result.product)


    const fpResponse = await fetch(`/api/getproducts?tags=${'Featured'}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const fProducts = await fpResponse.json();
    console.log("Success:", fProducts.product);
    setFeaturedProducts(fProducts.product)
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])






  const imageLinks = [
    '/slider1.png',
    '/slider2.png',
    '/slider3.png',
  ];

  const [activeItem, setActiveItem] = useState(0);

  const handlePrevClick = () => {
    setActiveItem((prevItem) => (prevItem === 0 ? 2 : prevItem - 1));
  };

  const handleNextClick = () => {
    setActiveItem((prevItem) => (prevItem === 2 ? 0 : prevItem + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [Msg, setMsg] = useState('Add to Cart')

  const addtocart = (productId) => {
    AddToCart(productId)
    setMsg("Added to cart")
    setTimeout(() => {
      setMsg("Add to Cart")
    }, 2000);
  }

  return (
    <div className='overflow-x-hidden'>

      {/* Slider Caraousel */}
      <section className="text-gray-600 body-font py-3">
        <div className="container py-4 mx-auto">
          <div className="flex flex-wrap -m-4 justify-start">


            <div id="controls-carousel" className="relative sm:w-3/5 w-full" data-carousel="static">
              <div className="relative h-52 overflow-hidden md:h-full">
                {imageLinks.map((link, index) => (
                  <div
                    key={index}
                    className={`duration-700 ease-in-out absolute top-0 left-0 w-full h-full ${activeItem === index ? 'opacity-100' : 'opacity-0'}`}
                    data-carousel-item={activeItem === index ? 'active' : ''}
                  >
                    <Image
                      height={3000}
                      width={3000}
                      src={link}
                      className="block w-full h-full object-cover"
                      alt={`Image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
                onClick={handlePrevClick}
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full">
                  <svg className="w-4 h-4 text-white dark:text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
                onClick={handleNextClick}
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full ">
                  <svg className="w-4 h-4 text-white text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>

            <div className='w-2/5 flex sm:flex flex-col hidden justify-center'>
              <div className='mb-2 ms-2 h-min'>
                <Image height={2000} width={2000} className="h-full w-full object-cover" src='/image_800x1.png' alt='heder-images' />
              </div>
              <div className='ms-2 h-min'>
                <Image height={2000} width={2000} className="h-full w-full object-cover" src='/image_800x2.png' alt='heder-images' />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-10 text-center">Top Categories</h1>
          <div className="flex flex-wrap -m-4 md:justify-around justify-center w-auto whitespace-nowrap overflow-hidden">

            <div className='p-2 md:w-1/5 w-1/2 flex items-center flex-col bg-white transition duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110'>
              <Link href={`searchresults?search=iot`} className='bg-gray-100 h-full w-full flex items-center justify-between flex-col p-3'>
                <Image src={"/category1.png"} height={120} width={120} alt='image_category' />
                <p className='text-sm font-bold uppercase'>IoT & Wireless</p>
              </Link>
            </div>


            <div className='p-2 md:w-1/5 w-1/2 flex items-center flex-col bg-white transition duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110'>
              <Link href={`searchresults?search=drone`} className='bg-gray-100 h-full w-full flex items-center justify-between flex-col p-3'>
                <Image src={"/category2.png"} height={120} width={120} alt='image_category' />
                <p className='text-sm font-bold uppercase'>Robots & Drones</p>
              </Link>
            </div>

            <div className='p-2 md:w-1/5 w-1/2 flex items-center flex-col bg-white transition duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110'>
              <Link href={`searchresults?search=projects`} className='bg-gray-100 h-full w-full flex items-center justify-between flex-col p-3'>
                <Image src={"/category3.png"} height={120} width={120} alt='image_category' />
                <p className='text-sm font-bold uppercase'>Science Projects</p>
              </Link>
            </div>

            <div className='p-2 md:w-1/5 w-1/2 flex items-center flex-col bg-white transition duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110'>
              <Link href={`searchresults?search=electronic`} className='bg-gray-100 h-full w-full flex items-center justify-between flex-col p-3'>
                <Image src={"/category4.png"} height={120} width={120} alt='image_category' />
                <p className='text-sm font-bold uppercase'>Electronic parts</p>
              </Link>
            </div>


          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-5 text-center">Featured Products</h1>

          {Loading && <Spinner />}
          <div className="flex h-full lg:flex-row flex-col lg:items-stretch items-center">

            {FeaturedProducts.map((product, index) => (
              <div key={index} className="card-container relative flex flex-col overflow-hidden rounded border-2 bg-white p-4 transition-all duration-300 hover:border-red-500 justify-between m-2 lg:w-1/4 md:w-1/2 w-72">
                <div className="btn-wishlist absolute right-2 top-2 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary transition-transform duration-300 ease-in-out hover:rotate-360">
                  <i className="bi bi-heart pointer-events-none flex text-lg text-white"></i>
                </div>
                <div className="absolute left-0 top-0 rounded-br bg-red-500 px-2 py-1 uppercase text-white">
                  <span>50% off</span>
                </div>
                <div className="h-64">
                  <Link href={`product?id=${product.productId}`}>
                    <img className="object-cover h-full w-full" src={product.productImage} alt="img" />
                  </Link>
                </div>
                <div className="flex flex-col gap-2 justify-end ">
                  <div>
                    <a className="clamp text-xl font-bold transition-all duration-300 hover:text-primary" href="#">
                      {product.productName}
                    </a>
                    <p className="clamp-3">
                      {product.productDescription.slice(0, 70)}....
                    </p>
                    <div className="mt-auto flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">₹{product.productPrice}</span>
                      <span className="text-sm line-through">₹{product.productPrice * 2}</span>
                    </div>
                  </div>
                </div>
                <Link href={`product?id=${product.productId}`} className="flex w-full items-center justify-center gap-2 rounded bg-red-500 p-2 font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-red-600" type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="bi bi-eye h-5 w-5" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                  <span>View</span>
                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Type writer */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap w-full mb-5 flex-col items-center text-center">
            <h1 className="sm:text-4xl text-2xl font-mono title-font text-gray-900">We Deliver <Typewriter
              options={{
                strings: ["Science projects", "Development Boards", "IoT Devices", "IoT Tools", "Electronic Parts", "Automation devices"],
                autoStart: true,
                loop: true,
                // cursor: "|",
              }}
            /></h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">&quot;Shop now at RoboX shop &quot;</p>
          </div>
          <div className="container mx-auto px-5 py-5">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
                <div className="bg-gray-50 flex w-full flex-col items-center justify-center gap-2 rounded  p-5 transition-all duration-300 hover:shadow-lg ">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                      <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h6 className="font-bold capitalize">Free Shipping</h6>
                    <p className="break-all text-sm text-gray-400">
                      For all order of  ₹500+
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded bg-gray-50 p-5 transition-all duration-300 hover:shadow-lg">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                      <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                      <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                    </svg></div>
                  <div className="text-center">
                    <h6 className="font-bold capitalize">Money Back</h6>
                    <p className="break-all text-sm text-gray-400">Within 20 days</p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded bg-gray-50 p-5 transition-all duration-300 hover:shadow-lg">
                  <div><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                  </svg></div>
                  <div className="text-center">
                    <h6 className="font-bold capitalize">Secure Payment</h6>
                    <p className="break-all text-sm text-gray-400">Secured payment</p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded bg-gray-50 p-5 transition-all duration-300 hover:shadow-lg">
                  <div> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-headset" viewBox="0 0 16 16">
                    <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
                  </svg></div>
                  <div className="text-center">
                    <h6 className="font-bold capitalize">Online Support</h6>
                    <p className="break-all text-sm text-gray-400">Support 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Testimonials</h1>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-100 p-8 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed mb-6">The Robox Shop website offers an easy browsing experience, which makes the entire purchasing process good. Robox Shop continues to be the best choice for IoT parts. In addition to meeting a variety of purposes, the selection of components they provide is also quite affordable.</p>
                <a className="inline-flex items-center">
                  <Image height={100} width={100} alt="testimonial" src="/testinomial.png" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">Avinash</span>
                    <span className="text-gray-500 text-sm">Design Engineer</span>
                  </span>
                </a>
              </div>
            </div>
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-100 p-8 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed mb-6">I am completely satisfied with the website design and the overall purchasing experience. Robox Shop is the ultimate choice for IoT components. They offer a wide range of components at very budget-friendly prices, and their seasonal offers are exceptional. Furthermore, their delivery service is impressively fast and reliable.</p>
                <a className="inline-flex items-center">
                  <Image height={100} width={100} alt="testimonial" src="/testinomial.png" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">Tanu</span>
                    <span className="text-gray-500 text-sm">Student</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Image src={"/logo_512.png"} height={100} width={100} alt='footerImage' />
            <span className="ml-3 text-xl">RoboX Shop</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 RoboX Shop —
            <a href="https://zbytes2227.github.io" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@Ujjwal_Kushwaha</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            @zbytes2227
          </span>
        </div>
      </footer>
    </div>

  )
}



export default Header
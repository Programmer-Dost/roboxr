"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ProductBox from '@/components/ProductBox';
import { useRouter, useSearchParams } from 'next/navigation';
import Addtocart from '@/functions/Addtocart';
import Buynow from '@/functions/Buynow';
import AddToCart from '@/functions/Addtocart';
import Image from 'next/image';


const Page = () => {

    const searchParams = useSearchParams()
    const router = useRouter();
    const id = searchParams.get('id')

    const [Product, setProduct] = useState([])

    async function fetchProducts() {
        const response = await fetch(`/api/getproducts?productId=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        console.log("Success:", result.product[0]);
        setProduct(result.product[0])
    }

    useEffect(() => {
        fetchProducts()
        window.scrollTo(0, 0);
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    function buynow() {
        Buynow(Product.productId);
        router.push('/cart');
    }


    const [RProducts, setRProducts] = useState([])

    async function fetchRProducts() {
        const response = await fetch(`/api/getproducts?tags=${"s"}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        console.log("Success:", result.product);
        setRProducts(result.product)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchRProducts()
    }, [])


    const [Msg, setMsg] = useState('Add to Cart')

    const addtocart = (productId) => {
        AddToCart(productId)
        setMsg("Added to cart")
        setTimeout(() => {
            setMsg("Add to Cart")
        }, 2000);
    }


    const [Pincode, setPincode] = useState()
    const [PincodeMsg, setPincodeMsg] = useState('')





    async function getPincodeInfo(Pincode) {
        setPincodeMsg(`Checking...`)
        try {
            console.log(Pincode);
            const url = `https://api.postalpincode.in/pincode/${Pincode}`;
            const response = await fetch(url);

            if (!response.ok) {
                setPincodeMsg(`Please try again later!`)
            }

            const [data] = await response.json();

            if (!data || !data.PostOffice || data.PostOffice.length === 0) {
                setPincodeMsg(`Wrong Pincode !`)
            }

            const { State, District } = data.PostOffice[0];
            console.log({ state: State, district: District });
            setPincodeMsg(`Delivery Availiable for ${State},${District}`)

        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    }

    // Example usage:
    //   const pincode = "211013";
    //   getPincodeInfo(pincode)
    //     .then((result) => {
    //       if (result) {
    //         console.log("State:", result.state);
    //         console.log("District:", result.district);
    //       } else {
    //         console.log("Unable to extract data.");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Fetch error:", error);
    //     });





    return (
        <>
            <section class="text-gray-600 body-font overflow-hidden">
                <div class="container px-5 py-12 mx-auto">
                    <div class="lg:w-full mx-auto flex flex-wrap justify-center">
                        <Image
                            height={400}
                            width={400}
                            alt="ecommerce"
                            class="h-[30vh] lg:h-[60vh] object-cover object-center rounded"
                            src={Product.productImage}
                        />
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 class="text-sm title-font text-gray-500 tracking-widest">
                                ----
                            </h2>
                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                                {Product.productName}
                            </h1>
                            <div class="flex mb-4">
                                <span class="flex items-center">
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        class="w-4 h-4 text-red-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        class="w-4 h-4 text-red-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        class="w-4 h-4 text-red-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        class="w-4 h-4 text-red-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        class="w-4 h-4 text-red-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span class="text-gray-600 ml-3">4 Reviews</span>
                                </span>

                            </div>
                            <p class="leading-relaxed">
                                {Product.productDescription}
                            </p>
                            {/* <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div class="flex">
                  <span class="mr-3">Color</span>
                  <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Size</span>
                  <div class="">
                    <select class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div> */}
                            <div class="flex mt-6">
                                <span class="title-font font-medium text-2xl text-gray-900">
                                    ₹ {Product.productPrice}
                                </span>
                                <button onClick={buynow} class="flex ml-4 md:ml-12 text-white bg-red-500 border-0 py-2 px-1.5 md:px-6 focus:outline-none hover:bg-red-600 rounded font-semibold uppercase tracking-wider text-white">
                                    Buy now
                                </button>
                                <button onClick={() => addtocart(Product.productId)} class="flex ml-4 text-white bg-red-500 border-0 py-2 px-1.5 md:px-6 focus:outline-none hover:bg-red-600 rounded font-semibold uppercase text-white">
                                    {Msg}
                                </button>
                                {/* <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button> */}
                            </div>
                            <div class="flex flex- w-full md:justify-start items-center mt-8">
                                <div class="lg:w-full mr-3 xl:w-1/2 w-2/4">
                                    {/* <label
                    for="hero-field"
                    class="leading-7 text-sm text-gray-600"
                    >
                    Placeholder
                  </label> */}
                                    <input
                                        type="number"
                                        required={true}
                                        id="hero-field"
                                        placeholder="Enter Pincode"
                                        name="hero-field"
                                        value={Pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-red-200 focus:bg-transparent focus:border-red-500 text-base outline-none text-gray-700 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>


                                <button onClick={() => getPincodeInfo(Pincode)} type="submit" class="inline-flex text-white bg-red-500 border-0 py-1.5 px-4 focus:outline-none hover:bg-red-600 rounded text-lg">
                                    Check
                                </button>
                            </div>
                            <p className='text-green-600'>{PincodeMsg}</p>
                            {/* {service == null ?
                <p className="my-1 font-medium text-gray-600">Enter your Pincode to Check Availability</p>
                :
                service === true ?
                  <p className="my-1 font-medium text-red-600">The product is Deliverable here !</p>
                  :
                  <p className="my-1 font-medium text-rose-600">Sorry we don&apos;t deliver here !</p>
              } */}

                        </div>
                    </div>

                    <div className=''>
                        {/* <h1 class="text-gray-900 text-2xl mt-10 text-center title-font font-medium mb-1">
                            Product Details
                        </h1> */}

                        {/* <div class="relative overflow-x-auto sm:rounded-lg flex justify-center hidden">
                            <table class="lg:w-1/2 w-full text-sm text-left text-gray-500 ">
                                <tbody>
                                    <tr class="bg-white border-b">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            Apple MacBook Pro 17
                                        </th>
                                        <td class="px-6 py-4">
                                            Silver
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}

                        <h1 class="text-gray-900 text-2xl mt-10 text-left title-font font-medium mb-1">
                            You may also like
                        </h1>

                        <div className="container p-1 mx-auto">
                            <div className="flex flex-wrap justify-center items-center sm:items-start sm:flex-row flex-col">

                                {RProducts.map((product, index) => (
                                    <ProductBox
                                        key={index}
                                        productName={product.productName}
                                        productPrice={product.productPrice}
                                        productTags={product.productTags}
                                        productImage={product.productImage}
                                        productId={product.productId}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}

export default Page
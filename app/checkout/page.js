"use client"
import ConfirmLeave from '@/functions/Confimleave';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const router = useRouter();
  const [ValidUser, setValidUser] = useState(false)

  async function auth() {
    const fetch_api = await fetch("/api/auth/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();

    if (data.success) {
      setValidUser(true);
      //   setUser(data)
    } else {
      router.push('/login?redirect=checkout')
      setValidUser(false);
    }
  }

  useEffect(() => {
    auth()
  }, [])



  const [cartData, setcartData] = useState()
  let cartProducts = 9;
  const [totalAmount, setTotalAmount] = useState(0); // Initialize totalAmount state



  useEffect(() => {
    let ID = (JSON.parse(localStorage.getItem('cart')))
    cartProducts = Object.keys(ID).map(key => key.toString());
    console.log(ID);
    setcartData(ID)
    checkout(ID)
    console.log(Products);

  }, [])


  const [Products, setProducts] = useState([])

  async function checkout(ID) {
    const response = await fetch("/api/checkout/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    });

    const result = await response.json();
    console.log("Success:", result);
    setProducts(result.products)
    setTotalAmount(result.total)
    if (result.error) {
      router.push('/cart');
      toast.error(`Error while checking out.`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }




  //   useEffect(() => {
  //       let total = 0;
  //       for (const productId in cartData) {
  //           if (cartData.hasOwnProperty(productId)) {
  //               const product = Products.find((item) => item.productId === productId);
  //               if (product) {
  //                   total += product.productPrice * cartData[productId];
  //               }
  //           }
  //       }
  //       setTotalAmount(total);
  //   }, [cartData, Products]);

  async function handlePayment() {
    const fetch_api = await fetch("/api/generate_order/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartData),
    });

    const data = await fetch_api.json();
    console.log(data);
    if (data.success) {
      router.push('/checkout/payment')
    } else if (data.redirect) {
      // Toast
      router.push('/myaccount?account=true')
    } else {
      console.log("err");
    }
  }


  return (
    <>
      {ValidUser ?

        <section className="flex justify-center">
          <div className="flex container justify-center flex-col md:flex-row ">
            <ToastContainer />
            <div className="m-1 px-2 md:w-3/5 w-full">
              <h1 className='text-center text-2xl uppercase font-semibold'>My Cart</h1>
              <div className="p-2 w-full">
                <div className='flex items-center justify-between m-3'>
                  <p className="text-xl font-semibold">Total Amount: ₹{totalAmount}. Proceed to Pay. </p>
                  <button onClick={handlePayment} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-3 py-1.5 text-center dark:border-red-500 dark:text-red-500">Payment</button>
                </div>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg hover:bg-gray-100">
                  <div className="flex-grow">
                    {Products && Products.map((item, index) => {
                      let itemCount = cartData[item.productId] || 0;

                      return (
                        <div key={index} className="p-2 w-full">
                          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg hover:bg-gray-100">
                            <Image
                            height={200}
                            width={200}
                              alt={`Item ${index}`}
                              className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-md mr-4"
                              src={item.productImage}
                            />
                            <div className="flex-grow">
                              <h2 className="text-gray-900 title-font font-medium">{item.productName}</h2>
                              <div className="text-gray-500"><span className='font-bold text-black'>₹ {item.productPrice}</span> x {itemCount}</div>
                            </div>
                            <div className="flex-grow flex flex-col items-end">

                              <div className="h-10 ">
                                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                  <div
                                    className="outline-none rounded-lg focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700  outline-none p-2">
                                    ₹{item.productPrice * itemCount}/-
                                  </div>

                                </div>
                              </div>

                            </div>

                          </div>
                        </div>
                      );
                    })}

                    <div className='flex justify-between px-4 items-center'>
                      <p className="text-gray-500">Total Amount to Pay: ₹{totalAmount}</p>
                      <button onClick={handlePayment} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-3 py-1.5 text-center dark:border-red-500 dark:text-red-500">Pay ₹{totalAmount}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>



          </div>

        </section> : ""}
    </>

  )
}

export default Page
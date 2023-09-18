"use client"
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import QRCode from "react-qr-code";


const Page = () => {
    const router = useRouter()
    const [validPaymentToken, setvalidPaymentToken] = useState(false)
    const [PaymentAddr, setPaymentAddr] = useState('')
    const [TotalAmount, setTotalAmount] = useState('')
    const [OrderID, setOrderID] = useState('')


    async function user_auth() {
        const fetch_api = await fetch("/api/auth/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await fetch_api.json();

        if (data.success) {
            payment_auth();
        } else {
            router.push('/login');
        }
    }

    async function payment_cancel() {
        const fetch_api = await fetch("/api/payment", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        const data = await fetch_api.json();
        console.log(data);
        router.push("/myaccount")
    }


    async function payment_auth() {
        const fetch_api = await fetch("/api/generate_order/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await fetch_api.json();
        if (data.success) {
            console.log(data.orderId);
            setTotalAmount(data.totalAmount);
            setPaymentAddr(`upi://pay?pa=paytmqrar9cpd74v2@paytm&am=${data.totalAmount}&tn=oid${data.orderId}`)
            setvalidPaymentToken(true);
            setOrderID(data.orderId)
        } else {
            setvalidPaymentToken(false);
            router.push("/")
        }
    }

    useEffect(() => {
        user_auth();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function payment_done() {
        const fetch_api = await fetch("/api/payment/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const data = await fetch_api.json();
        router.push("/myaccount")
    }

    // useEffect(() => {
    //     const handleBeforeUnload = (e) => {

    //         e.preventDefault();
    //         e.returnValue = 'Leaving this page will cancel your payment. Are you sure?';

    //     };

    //     window.onbeforeunload = handleBeforeUnload;

    //     return () => {
    //         window.onbeforeunload = null;
    //     };
    // }, []);







    return (
        <>
            {validPaymentToken ?
                <section className='flex justify-center'>

                    <div className="m-1 p-2 md:w-3/5 w-full">
                        <div className="py-1 flex flex-col justify-center sm:py-5">
                            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                                <div className="relative px-4 py-4 bg-white md:mx-0 shadow-xl border rounded-3xl sm:p-5">
                                    <div className="max-w-md mx-auto">
                                        <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                            <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                            </svg>
                                            <div>
                                                <span className="font-medium">Do Not Close</span> or Refresh the window.
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-5">

                                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                                <h4>Order no: <span className='text-red-500'>#{OrderID}</span></h4>
                                                <h2 className="leading-relaxed">To Pay: ₹{TotalAmount}</h2>
                                                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                                                    Scan or pay using UPI, then click on Payment Done, after verification we will approve your payment & your order will be placed.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="divide-y divide-gray-200">
                                            <div className="pt-5 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                                {/* <div className="flex flex-col">
                                            <label className="leading-loose">UPI Id</label>
                                            <input
                                                type="text"
                                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                placeholder="Event title"
                                            // value={userName}
                                            // onChange={(e) => setUserName(e.target.value)}
                                            // disabled={accountEdit ? false : true}

                                            />
                                        </div> */}
                                                <div className="flex flex-col items-center ">
                                                    <label className="leading-loose">Scan Qr to pay</label>
                                                    {/* <Image width={250} height={250} src='/qrcode.jpeg'/> */}
                                                    <div className='border-2 p-2.5 rounded-md'>
                                                        <QRCode value={PaymentAddr} />
                                                    </div>

                                                    <Link onClick={() => { setTimeout(payment_done, 1000); }} href={PaymentAddr} type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 my-3 w-full md:hidden block">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2 -ml-1 w-7 h-4 bi bi-credit-card" viewBox="0 0 16 16">
                                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                                                            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                                                        </svg>
                                                        Pay using UPI App
                                                    </Link>
                                                </div>


                                            </div>
                                            <div className="pt-4 flex-grow flex flex-col">
                                                <button onClick={payment_done} className="bg-green-600 flex justify-center items-center w-full text-white mb-2 px-4 py-2 rounded-md focus:outline-none">
                                                    Payment Done
                                                </button>
                                                <button onClick={payment_cancel} className="bg-rose-500 flex justify-center items-center w-full text-white px-4 py-2 rounded-md focus:outline-none">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <div className='flex flex-col items-center'>
                    <h2 className='text-center mt-5'>Invalid Payment Token</h2>
                    <Link href={'/'} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-3 mt-4 py-1.5 text-center dark:border-red-500 dark:text-red-500">Home</Link>
                </div>
            }
        </>

    )
}

export default Page
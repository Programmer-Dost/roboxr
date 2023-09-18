"use client"

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState("");
    const [Loading, setLoading] = useState(false);


    const router = useRouter();

    async function registerUser(e) {
        try {
            e.preventDefault();
            setLoading(true);
            const fetch_api = await fetch("/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
            });

            const data = await fetch_api.json();
            setLoading(false);
            if (data.success) {
                toast.success(`${data.msg}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setEmail('');
                setPassword('');
                setName('')
                setTimeout(() => {
                    router.push('/myaccount');
                }, 1000);
            } else {
                toast.error(`${data.msg}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(`You are offline`, {
                position: "top-center",
                autoClose: 3300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }


    return (
        <>
            <section>
                <ToastContainer />

                <div className="flex flex-col pt-10 sm:pt-6 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    {/* <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-16 h-16 mr-2 rounded-full" src="/192.png" alt="logo" />
                        Task Mate
                    </Link> */}
                    <div className="w-full bg-white rounded-lg border shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                                Sign up to Task Mate
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={registerUser}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5" placeholder="name@company.com" required="" value={name} onChange={(e) => { setName(e.target.value) }} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5" placeholder="name@company.com" required="" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" required="" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                    </div>

                                </div>
                                <button type="submit" className={`w-full text-white bg-red-600 hover:bg-red-700 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center ${Loading && 'bg-red-100'} `}>Sign up</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account ? <Link href="/login" className="font-medium text-red-600 hover:underline">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
const Page = () => {
    const [cartData, setcartData] = useState()
    let cartProducts = 9;
    const [totalAmount, setTotalAmount] = useState(0); // Initialize totalAmount state

    const router = useRouter();

    useEffect(() => {

        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify({}));
        }

        let ID = (JSON.parse(localStorage.getItem('cart')))
        cartProducts = Object.keys(ID).map(key => key.toString());
        console.log(ID);
        setcartData(ID)
        fetchProducts(cartProducts)
        console.log(Products);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [Products, setProducts] = useState([])

    async function fetchProducts(ID) {
        if (ID.length) {

            const response = await fetch(`/api/getproducts?productId=${ID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();
            console.log("Success:", result.product);
            setProducts(result.product)
        }
    }




    const handleQuantityChange = (productId, newQuantity) => {
        // Update the local state (cartData) with the new quantity
        setcartData(prevCartData => ({
            ...prevCartData,
            [productId]: newQuantity,
        }));

        // Update the localStorage with the new quantity
        const updatedCartData = {
            ...cartData,
            [productId]: newQuantity,
        };

        localStorage.setItem('cart', JSON.stringify(updatedCartData));
    };

    const removeFromCart = (productId) => {
        window.location.reload();
        // Remove the item from localStorage
        const cartData = JSON.parse(localStorage.getItem('cart')) || {};
        delete cartData[productId];
        localStorage.setItem('cart', JSON.stringify(cartData));

        setcartData((prevCartData) => {
            const updatedCartData = { ...prevCartData };
            delete updatedCartData[productId];
            return updatedCartData;
        });
    };


    useEffect(() => {
        let total = 0;
        if (Products) {

            for (const productId in cartData) {
                if (cartData.hasOwnProperty(productId)) {
                    const product = Products.find((item) => item.productId === productId);
                    if (product) {
                        total += product.productPrice * cartData[productId];
                    }
                }
            }
            setTotalAmount(total);
        }
    }, [cartData, Products]);


    return (
        <section className="flex justify-center">
            <div className="flex container justify-center flex-col md:flex-row ">
                <div className="m-1 px-2 md:w-3/5 w-full">
                    <h1 className='text-center text-2xl uppercase font-semibold'>My Cart</h1>
                    <div className={`flex items-center justify-between m-3 ${totalAmount ? "" : "hidden"}`}>
                        <p className="text-xl font-semibold">Total Amount: ₹ {totalAmount}</p>
                        <Link href={'/checkout'} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800  focus:outline-none font-medium rounded-lg text-md px-3 py-1.5 text-center dark:border-red-500 dark:text-red-500">Checkout</Link>
                    </div>

                    {totalAmount == 0 ? (
                        <p className='text-center mt-4'>Ohh.. Your cart is Empty 😳</p>
                    ) : ""}

                    {Products && Products.length && (
                        <p className='text-center mt-4'></p>
                    )}
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
                                        <div className="text-gray-500"><span className='font-bold text-black'>₹ {item.productPrice}</span> (Qty: {itemCount}) <button onClick={() => removeFromCart(item.productId)} className='text-red-600 underline'>Remove</button></div>
                                    </div>
                                    <div className="flex-grow flex flex-col items-end">

                                        <div className="custom-number-input h-10 w-12">
                                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">

                                                <input
                                                    type="number"
                                                    className="outline-none rounded-lg focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700  outline-none"
                                                    name="custom-input-number"
                                                    defaultValue={itemCount}
                                                    max={item.stock}
                                                    min={1}
                                                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}

                                                />

                                            </div>
                                        </div>

                                        {/* <p className="text-gray-500">₹ {item.productPrice} (Qty: {itemCount})</p> */}
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>

    )
}

export default Page
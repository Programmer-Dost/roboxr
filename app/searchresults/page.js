'use client'

import ProductBox from '@/components/ProductBox'
import Searchbar from '@/components/Searchbar'
import Spinner from '@/components/Spinner'
import AddToCart from '@/functions/Addtocart'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Searchresults() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')

    const [Products, setProducts] = useState([])
    const [Loading, setLoading] = useState(false)
    const [sortingOption, setSortingOption] = useState('');

    async function fetchProducts() {
        setLoading(true)
        const response = await fetch(`/api/getproducts?search=${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        console.log("Success:", result.product);
        setProducts(result.product)
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts()
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])


    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        setSortingOption(selectedOption);

        // Create a copy of the products array to avoid modifying the original array
        const sortedProducts = [...Products];

        // Sort the copy of products based on the selected option
        if (selectedOption === 'lowToHigh') {
            sortedProducts.sort((a, b) => a.productPrice - b.productPrice);
        } else if (selectedOption === 'highToLow') {
            sortedProducts.sort((a, b) => b.productPrice - a.productPrice);
        }

        // Update the state with the sorted products
        setProducts(sortedProducts);
    };





    return <>
        <div className='flex justify-center'>
            <div className='container  '>
                <section className="text-gray-600 body-font">
                    <div className='mx-3 px-4 flex justify-between items-center my-4'>
                        <p className=''>Found {Products.length} products</p>
                        <div className='bg-blue-100'>
                            <div className="w-full lg:max-w-sm">
                                <select
                                    className="w-full p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                                    onChange={handleSortChange}
                                    value={sortingOption}
                                >
                                    <option value="">Sort by</option>
                                    <option value="lowToHigh">Price : Low to High</option>
                                    <option value="highToLow">Price : High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="container p-1 mx-auto">
                        {Loading && <Spinner />}
                        <div className="flex flex-wrap justify-center items-center sm:items-start sm:flex-row flex-col">

                            {Products.map((product, index) => (
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

                </section>
            </div>
        </div>

    </>
}
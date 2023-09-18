"use client"
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

  const router = useRouter();
  const [ValidAdmin, setValidAdmin] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [Orders, setOrders] = useState([])

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productTags, setProductTags] = useState([]);
  const [productPrice, setProductPrice] = useState();
  const [productId, setproductId] = useState()
  const [stock, setStock] = useState();
  const [searchQuery, setsearchQuery] = useState("A")
  const [Products, setProducts] = useState([])

  async function AdminAuth() {
    const fetch_api = await fetch("/api/admin/auth/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    if (data.success) {
      setValidAdmin(true)
      getuserOrders()
    } else {
      setValidAdmin(false)
      router.push('/admin/login')
    }
  }


  useEffect(() => {
    AdminAuth()
    getProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  async function getuserOrders() {
    setLoading(true)
    const fetch_api = await fetch("/api/admin/getorders", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    if (data.success) {
      setOrders(data.Orders);
    }
    setLoading(false)
  }


  async function Logout() {
    const fetch_api = await fetch(`/api/admin/logout`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    if (data.success) {
      window.location.reload();
    }
  }

  async function getProducts() {
    setLoading(true)
    const fetch_api = await fetch(`/api/admin/products?search=${searchQuery}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    if (data.success) {
      console.log('data');
      console.log(data.product);
      setProducts(data.product);
    }
    setLoading(false)
  }


  async function addProduct() {
    const fetch_api = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: productName,
        productDescription: productDescription,
        productImage: productImage,
        productTags: productTags,
        productPrice: productPrice,
        productId: productId,
      }),
    });
    const data = await fetch_api.json();
    if (data.success) {
      toast.success(`${data.msg}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(`${data.msg}`, {
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

  async function deleteProduct(productId) {
    let confim = confirm("Are you sure, This will delete the product.")
    if (confim) {
      const fetch_api = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: productId,
        }),
      });
      const data = await fetch_api.json();
      if (data.success) {
        toast.success(`${data.msg}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();
      } else {
        toast.error(`${data.msg}`, {
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
  }





  return (
    <>
      {ValidAdmin ? <section className="flex justify-center">
        <div className={"flex container justify-center  md:flex-row  flex-col"}>
          <div className="border-b-2 md:border-r-2 m-1 px-2 md:w-3/5 w-full h-screen overflow-y-auto ">
            <ToastContainer />
            <div className="block pl-2 font-semibold text-2xl self-start text-gray-700 ps-8">
              <h2 className="leading-relaxed">All Porducts</h2>
              <p className="text-sm text-gray-500 font-normal leading-relaxed">
                All Your Products !
              </p>

              <div class="flex flex- w-full md:justify-start items-center mt-2">
                <div class="lg:w-full mr-3 xl:w-1/2 w-2/4">

                  <input type="text" required={true} placeholder='search' value={searchQuery} onChange={(e) => setsearchQuery(e.target.value)} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-red-200 focus:bg-transparent focus:border-red-500 text-base outline-none text-gray-700 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <button onClick={getProducts} type="submit" class="inline-flex text-white bg-red-500 border-0 py-1.5 px-4 focus:outline-none hover:bg-red-600 rounded text-lg">
                  Search
                </button>
                <Link href={"/admin/dashboard/orders"} type="submit" class="mx-3 inline-flex text-white bg-red-500 border-0 py-1.5 px-4 focus:outline-none hover:bg-red-600 rounded text-lg">
                  All Orders
                </Link>
              </div>
            </div>
            {Loading && <Spinner />}
            {!Products.length && !Loading ? <p className="text-lg text-center">You dont have made any orders yet !</p> : ""}
            {Products.length ? Products.map((product, index) => (
              <div key={index} className="p-2 w-full">
                <div className="h-full flex items-center border-gray-200 border cursor-pointer p-4 rounded-lg hover:bg-gray-100">
                  <Image src={product.productImage} height={60} width={60} className='mr-3' alt='Product Image'/>
                  <Link href={`/product/?id=${product.productId}`} target="_blank" className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium text-lg">{product.productName}</h2>
                    <h2 className="text-gray-900 title-font font-medium text-lg">#{product.productId}<span className="text-sm text-gray-600"> | Stock: {product.stock}</span>
                    </h2>
                    {/* <p className="text-sm"> Payment Status: {order.payment_status}</p>  */}
                    <div className="text-gray-500">
                      {product.productTags.slice(0, 3).map((product, productIndex) => (
                        <span key={productIndex}>
                          {productIndex > 0 && ', '}
                          {product}
                        </span>
                      ))}
                    </div>
                  </Link>
                  <svg onClick={() => deleteProduct(product.productId)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </div>
              </div>
            )) : "d"}




          </div>
          <div className="px-6 md:w-3/5 w-full">
            <div className=" flex flex-col justify-center">
              <div className="relative py-3 sm:max-w-xl sm:mx-auto">

                <div className="max-w-md mx-auto">
                  <div className="flex items-center space-x-5 justify-around">
                    <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                      P
                    </div>
                    <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                      <h2 className="leading-relaxed">Add Products</h2>
                      <p className="text-sm text-gray-500 font-normal leading-relaxed">
                        Image Links are only supported
                      </p>

                    </div>
                    {
                      ValidAdmin ? <div className="flex justify-center mt-3"><button onClick={Logout} type="button" className="ms-2 text-white bg-red-500 hover:bg-red-600 focus:outline-none font-medium rounded-full text-sm px-4 py-1 text-center mr-2 mb-2 ">Logout</button>
                      </div> : ""
                    }
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="flex flex-col">
                        <label className="leading-loose">Product Name</label>
                        <input
                          type="text"
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="Item name"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose">Image Link</label>
                        <input
                          type="text"
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="Only in Link format"
                          value={productImage}
                          onChange={(e) => setProductImage(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose">Product Tags</label>
                        <input
                          type="text"
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="Use Comma (,) to seperate"
                          value={productTags}
                          onChange={(e) => setProductTags(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <label className="leading-loose">Product Price</label>
                          <div className="relative focus-within:text-gray-600 text-gray-400">
                            <input
                              type="number"
                              className="pr-4 pl-3 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Product price"
                              value={productPrice}
                              onChange={(e) => { setProductPrice(e.target.value) }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="leading-loose">Product Id</label>
                          <div className="relative focus-within:text-gray-600 text-gray-400">
                            <input
                              type="number"
                              className="pr-4 pl-3 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Raebareli,UP"
                              value={productId}
                              onChange={(e) => setproductId(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose">Product Description</label>
                        <textarea
                          type="text"
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="Describe the product"
                          value={productDescription}
                          rows={4}
                          onChange={(e) => setProductDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="pt-4 flex items-center space-x-4">


                      <button onClick={addProduct} className="bg-red-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                        Add this Product
                      </button>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* <button onClick={showSettings}
      className="fixed bottom-24 mb-1 sm:hidden block right-8 p-4 rounded-full bg-red-400 text-white z-20"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="" height="" fillRule="currentColor" className="bi bi-person-fill-gear w-5 md:w-8" viewBox="0 0 16 16">
        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
      </svg>
    </button> */}

      </section> : ""}
    </>
  )
}

export default Dashboard
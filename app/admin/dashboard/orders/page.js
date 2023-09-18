"use client"
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminOrders = () => {

  const router = useRouter();
  const [ValidAdmin, setValidAdmin] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [Orders, setOrders] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("");


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  async function getuserOrders() {
    setLoading(true)
    const fetch_api = await fetch("/api/admin/orders", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    if (data.success) {
      console.log(data.Orders);
      setOrders(data.Orders);
    }
    setLoading(false)
  }



  async function updatePaymentStatus(orderId, payment_status) {
    try {
      const response = await fetch(`/api/admin/orders`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: orderId, payment_status: payment_status }),
      });
      const data = await response.json();
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
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  async function updateOrderStatus(orderId, order_status) {
    try {
      const response = await fetch(`/api/admin/orders`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: orderId, order_status: order_status }),
      });
      const data = await response.json();
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
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }



  return (
    <>
      {ValidAdmin ? <section className="flex justify-center">
        <ToastContainer />
        <div className={"flex container justify-center  md:flex-row  flex-col"}>
          <div className="border-b-2 md:border-r-2 m-1 px-2 md:w-3/5 w-full h-screen overflow-y-auto ">
            <div className="block pl-2 font-semibold text-2xl self-start text-gray-700 ps-8">
              <h2 className="leading-relaxed">My Orders</h2>
              <p className="text-sm text-gray-500 font-normal leading-relaxed">
                All Your Orders Appear Here !
              </p>
            </div>
            {Loading && <Spinner />}
            {!Orders.length && !Loading ? <p className="text-lg text-center">You dont have made any orders yet !</p> : ""}
            {Orders.length ? Orders.slice().reverse().map((order, index) => (
              <div key={index} className="p-2 w-full">
                <div className="h-full flex items-center border-gray-200 border cursor-pointer p-4 rounded-lg hover:bg-gray-100">
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium text-lg">Name : {order.name}
                    </h2>
                    <h2 className="text-gray-900 title-font font-medium text-lg">#{order.orderID} <span className="text-sm text-gray-600">(Order date: {new Date(order.createdAt).toLocaleDateString()})</span>
                    </h2>
                    <p className='text-sm' > Order Status: {order.order_status}</p>
                    <p className="text-sm"> Payment Status: {order.payment_status}</p>
                    <div className="text-gray-500">
                      {order.products.slice(0, 2).map((product, productIndex) => (
                        <span key={productIndex}>
                          {productIndex > 0 && ', '}
                          {product.productName} x {product.quantity}
                        </span>
                      ))}

                      {order.products.length > 2 && (
                        <span> ...</span>
                      )}
                    </div>
                  </div>

                  <div className="w-md lg:max-w-sm">
                    <select
                      className="w-full p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                      onChange={(e) => {
                        updatePaymentStatus(order.orderID, e.target.value)
                      }}
                    >
                      <option value="">{order.payment_status}</option>
                      <option value="Payment: Paid-Verified">Paid-Verified</option>
                      <option value="Payment: Blacklisted">Payment Blacklisted</option>
                    </select>
                    <div className="w-md lg:max-w-sm mt-2">
                      <select
                        className="w-full p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                        onChange={(e) => {
                          updateOrderStatus(order.orderID, e.target.value)
                        }}
                      >
                        <option value="">{order.order_status}</option>
                        <option value="Order : Confirmed">Order : Confirmed</option>
                        <option value="Order : Delivered">Order : Delivered</option>
                        <option value="Order : Shipped">Order : Shipped</option>
                        <option value="Order : Canceled by Seller">Order : Canceled by Seller</option>
                      </select>
                    </div>
                  </div>


                </div>
              </div>
            )) : ""}




          </div>
          {/* <div className="px-6 md:w-3/5 w-full" ref={settingsRef}>
        <div className=" flex flex-col justify-center">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">

            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5 justify-around">
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                  {userName.slice(0, 1)}
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Account Settings</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Setup Your Account
                  </p>

                </div>
                {
                  ValidUser ? <div className="flex justify-center mt-3"><button onClick={handleLogout} type="button" className="ms-2 text-white bg-red-500 hover:bg-red-600 focus:outline-none font-medium rounded-full text-sm px-4 py-1 text-center mr-2 mb-2 ">Logout</button>
                  </div> : ""
                }
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Name</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Event title"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      disabled={accountEdit ? false : true}

                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Email</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Optional"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Contact Number</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Contact number"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      disabled={accountEdit ? false : true}

                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <label className="leading-loose">Pincode <span className="text-sm text-red-600">{PincodeMsg}</span></label>
                      <div className="relative focus-within:text-gray-600 text-gray-400">
                        <input
                          type="text"
                          className="pr-4 pl-3 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="200010"
                          value={pincode}
                          onChange={(e) => { setPincode(e.target.value); getPincodeInfo(e.target.value) }}
                          disabled={accountEdit ? false : true}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">City/State</label>
                      <div className="relative focus-within:text-gray-600 text-gray-400">
                        <input
                          type="text"
                          className="pr-4 pl-3 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="Raebareli,UP"
                          value={cityState}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Full Address</label>
                    <input
                      disabled={accountEdit ? false : true}
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Optional"
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  {accountEdit ?
                    <>
                      <button onClick={() => setaccountEdit(false)} className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                        <svg
                          className="w-6 h-6 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                        Cancel
                      </button>
                      <button onClick={handleSave} className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                        Save
                      </button>
                    </>
                    :
                    <button onClick={() => setaccountEdit(true)} className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                      Edit
                    </button>
                  }
                </div>
              </div>
            </div>

          </div>
        </div>
      </div> */}
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

export default AdminOrders
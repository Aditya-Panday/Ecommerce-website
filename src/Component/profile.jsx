import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { deleteWishlist } from "../Store/ActionCreators/WishlistActionCreators"
import ProfileTable from './ProfileTable'
export default function Profile() {
    let [user, setUser] = useState({})
    let [wishlist, setWishlist] = useState([])
    let [orders, setOrders] = useState([])

    let navigate = useNavigate()

    let dispatch = useDispatch()
    let WishlistStateData = useSelector((state) => state.WishlistStateData)
    let CheckoutStateData = useSelector((state) => state.CheckoutStateData)

    function deleteRecord(id) {
        if (window.confirm("Are Your Sure to Delete that Item")) {
            dispatch(deleteWishlist({ id: id }))
            getAPIData()
            if (wishlist.length === 1)
                setWishlist([])
        }
    }

    async function getAPIData() {
        try {
            // Fetch user data
            let userResponse = await fetch("http://localhost:8000/user/" + localStorage.getItem("userid"), {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let userData = await userResponse.json();

            // If user data exists, set it
            if (userData) {
                setUser(userData);
            } else {
                navigate("/login");
                return;
            }

            // Fetch wishlist data
            let wishlistResponse = await fetch("http://localhost:8000/wishlist", {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let wishlistData = await wishlistResponse.json();

            // If wishlist data exists, set it
            if (wishlistData && wishlistData.length) {
                setWishlist(wishlistData.filter((item) => item.userid === localStorage.getItem("userid")));
            } else {
                setWishlist([]);
            }

            // Fetch wishlist data
            let checkoutresponse = await fetch("http://localhost:8000/checkout", {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let checkoutData = await checkoutresponse.json();

            // If wishlist data exists, set it
            if (checkoutData && checkoutData.length) {
                setOrders(checkoutData.filter((item) => item.userid === localStorage.getItem("userid")));
            } else {
                setOrders([]);
            }


        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getAPIData()
    }, [WishlistStateData?.length, CheckoutStateData?.length])
    return (
        <div className='container-fluid my-5'>
            <div style={{ height: 50 }}></div>
            <div className="row">
                <div className="col-md-6">
                    {
                        user.pic ?
                            <img src={`/images/${user.pic}`} height={430} width="100%" /> :
                            <img src={`/images/noimage.png`} height={430} width="100%" />
                    }
                </div>
                <div className="col-md-6">
                    <ProfileTable user={user} heading="Buyer Profile" buttonText="Update Profile" />
                </div>
            </div>
            <h5 className='bg-primary text-center p-2'>Wishlist Section</h5>
            {
                wishlist.length ?
                    <>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Pic</th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        wishlist.map((item, index) => {
                                            return <tr key={index}>
                                                <td>
                                                    <a href={`/images/${item.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`/images/${item.pic}`} height={50} width={50} alt="" />
                                                    </a>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.brand}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                <td>&#8377;{item.price}</td>
                                                <td><Link to={`/product/${item.productid}`} className='btn btn-primary'><i className='fa fa-shopping-cart'></i></Link></td>
                                                <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </> :
                    <div className='text-center'>
                        <p>No Items in Wishlist</p>
                        <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                    </div>
            }

            <h5 className='bg-primary text-center p-2 my-3'>Order History Section</h5>
            {
                orders.length ?
                    <>
                        {
                            orders.map((item, index) => {
                                return <div className="row" key={index}>
                                    <div className="col-md-4">
                                        <div className="table-responsive">
                                            <table className='table table-bordered'>
                                                <tbody>
                                                    <tr>
                                                        <th>Order Id</th>
                                                        <td>{item.id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Order Status</th>
                                                        <td>{item.orderstatus}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Payment Mode</th>
                                                        <td>{item.paymentmode}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Payment Status</th>
                                                        <td>{item.paymentstatus}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Subtotal</th>
                                                        <td>&#8377;{item.subtotal}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Shipping</th>
                                                        <td>&#8377;{item.shipping}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total</th>
                                                        <td>&#8377;{item.total}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Date</th>
                                                        <td>{new Date(item.date).toLocaleDateString()}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="table-responsive">
                                            <table className='table table-bordered'>
                                                <thead>
                                                    <tr>
                                                        <th>Pic</th>
                                                        <th>Name</th>
                                                        <th>Brand</th>
                                                        <th>Color</th>
                                                        <th>Size</th>
                                                        <th>Price</th>
                                                        <th>QTY</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        item?.products?.map((item, index) => {
                                                            return <tr key={index}>
                                                                <td>
                                                                    <a href={`/images/${item.pic}`} target='_blank' rel='noreferrer'>
                                                                        <img src={`/images/${item.pic}`} height={50} width={50} alt="" />
                                                                    </a>
                                                                </td>
                                                                <td>{item.name}</td>
                                                                <td>{item.brand}</td>
                                                                <td>{item.color}</td>
                                                                <td>{item.size}</td>
                                                                <td>&#8377;{item.price}</td>
                                                                <td>{item.qty}</td>
                                                                <td>&#8377;{item.total}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            })
                        }
                    </> :
                    <div className='text-center'>
                        <p>No Order History Found</p>
                        <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                    </div>
            }
        </div>
    )
}

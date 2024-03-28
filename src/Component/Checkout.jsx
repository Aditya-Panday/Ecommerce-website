import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ProfileTable from './ProfileTable';

import { addCheckout } from '../Store/ActionCreators/CheckoutActionCreators';

export default function Checkout() {
    const [mode, setMode] = useState('COD');
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data based on the user ID stored in localStorage
                const userResponse = await fetch(`http://localhost:8000/user/${localStorage.getItem('userid')}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const userData = await userResponse.json();
                if (userData) {
                    setUser(userData);
                } else {
                    navigate('/login');
                }

                // Fetch cart data for the logged-in user from the API
                const cartResponse = await fetch(`http://localhost:8000/cart?userid=${localStorage.getItem('userid')}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const cartData = await cartResponse.json();
                setCart(cartData);

                // Calculate subtotal, shipping, and total based on cart data
                let subTotal = 0;
                for (let item of cartData) {
                    subTotal += item.total;
                }
                let shippingCost = 0;
                if (subTotal > 0 && subTotal < 1000) {
                    shippingCost = 150;
                }
                const grandTotal = subTotal + shippingCost;
                setSubtotal(subTotal);
                setShipping(shippingCost);
                setTotal(grandTotal);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [navigate]);

    const placeOrder = async () => {
        // Condition for date
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDate = new Date().toLocaleString('en-GB', options).replace(/\//g, '-');
        const orderData = {
            userid: user.id,
            paymentmode: mode,
            paymentstatus: 'Pending',
            orderstatus: 'Order is Placed',
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: formattedDate,
            products: cart
        };

        try {
            // Dispatch an action to add checkout data (assuming this action handles API calls and updating the store)
            await dispatch(addCheckout(orderData));

            // Delete cart items one by one
            for (let item of cart) {
                await fetch(`http://localhost:8000/cart/${item.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            // Clear cart after placing order
            setCart([]);
            navigate('/confirmation');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };


    return (
        <div className="container-fluid my-5">
            <div style={{ height: 50 }} />
            <div className="row">
                <div className="col-md-6">
                    <ProfileTable user={user} heading="Billing Address" buttonText="Update Address" />
                </div>
                <div className="col-md-6">
                    <h5 className="bg-primary text-center p-2">Cart Section</h5>
                    {cart.length ? (
                        <>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Pic</th>
                                            <th>Name</th>
                                            <th>Brand/Color/Size</th>
                                            <th>Price</th>
                                            <th>QTY</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <a href={`/images/${item.pic}`} target="_blank" rel="noreferrer">
                                                        <img src={`/images/${item.pic}`} height={50} width={50} alt="" />
                                                    </a>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.brand}/{item.color}/{item.size}</td>
                                                <td>&#8377;{item.price}</td>
                                                <td>{item.qty}</td>
                                                <td>&#8377;{item.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{total}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>
                                            <select name="mode" onChange={(e) => setMode(e.target.value)} className="form-select">
                                                <option value="COD">COD</option>
                                                <option value="Net Banking">Net Banking/CARD/UPI</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <button className="btn btn-primary w-100" onClick={placeOrder}>Place Order</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div className="text-center">
                            <p>No Items in Cart</p>
                            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

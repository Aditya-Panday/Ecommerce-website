import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';

import { deleteCart, updateCart } from '../Store/ActionCreators/CartActionCreators';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);
 
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    // let CartStateData = useSelector((state) => state.CartStateData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch cart data from the API
                const response = await fetch('http://localhost:8000/cart');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Filter the cart data based on the logged-in user's userid
                const loggedInUserId = localStorage.getItem('userid');
                const userCartData = data.filter((item) => item.userid === loggedInUserId);

                setCart(userCartData); // Update the cart state with fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Fetch data only once when the component mounts
    // Fetch data only once when the component mounts

    const deleteRecord = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(deleteCart({ id }));
            // Update the local cart state after deletion
            setCart(cart.filter((item) => item.id !== id));
        }
    };

    const updateRecord = (id, option) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                const newItem = { ...item };
                if (option === 'DEC') {
                    if (newItem.qty > 1) {
                        newItem.qty--;
                        newItem.total -= newItem.price;
                    }
                } else if (option === 'INC') {
                    newItem.qty++;
                    newItem.total += newItem.price;
                }
                return newItem;
            }
            return item;
        });
        setCart(updatedCart); // Update the local cart state
        dispatch(updateCart(updatedCart.find((item) => item.id === id)));
    };

    useEffect(() => {
        let subTotal = 0;
        cart.forEach((item) => {
            subTotal += item.total;
        });
        let shippingCost = 0;
        if (subTotal > 0 && subTotal < 1000) {
            shippingCost = 150;
        }
        const grandTotal = subTotal + shippingCost;
        setSubtotal(subTotal);
        setShipping(shippingCost);
        setTotal(grandTotal);
    }, [cart]); // Recalculate totals when cart changes

    return (
        <div className="container-fluid my-5">
            <div style={{ height: 50 }} />
            <h5 className="bg-primary text-center p-2">Cart Section</h5>
            {cart.length ? (
                <>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Pic</th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Price</th>
                                    <th></th>
                                    <th>QTY</th>
                                    <th></th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <a href={`/images/${item.pic}`} target="_blank" rel="noreferrer">
                                                <img src={`/images/${item.pic}`} height={50} width={50} alt="" />
                                            </a>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.color}</td>
                                        <td>{item.size}</td>
                                        <td>&#8377;{item.price}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => updateRecord(item.id, 'DEC')}>
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </td>
                                        <td>{item.qty}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => updateRecord(item.id, 'INC')}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </td>
                                        <td>&#8377;{item.total}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteRecord(item.id)}>
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6">
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
                                        <td colSpan={2}>
                                            <Link to="/checkout" className="btn btn-primary w-100">
                                                Checkout
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <p>No Items in Cart</p>
                    <Link to="/shop" className="btn btn-primary">
                        Shop Now
                    </Link>
                </div>
            )}
        </div>
    );
}

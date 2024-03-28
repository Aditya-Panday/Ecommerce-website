import React, { useState } from 'react'

import { addNewsletter } from "../Store/ActionCreators/NewsletterActionCreators"
import { useDispatch } from 'react-redux'
export default function Newsletter() {
    let [email, setEmail] = useState("")
    let [message, setMessage] = useState("")

    let dispatch = useDispatch()

    async function postData(e) {
        e.preventDefault();
        if (email) {
            try {
                const cartResponse = await fetch(`http://localhost:8000/newsletter`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await cartResponse.json(); // Parsing JSON response
                // console.log(data);

                // Check if email is already registered
                const isEmailRegistered = data.some((item) => item.email === email);
                if (isEmailRegistered) {
                    setMessage("Your Email Address is Already Registered With Us");
                } else {
                    dispatch(addNewsletter({ email: email }));
                    setMessage("Thanks for Subscribing to Our Newsletter Service");
                }
                setEmail('')
            } catch (error) {
                console.error('Error fetching newsletter data:', error);
                setMessage("Error fetching newsletter data. Please try again later.");
            }

        } else {
            setMessage("Please Enter a Valid Email Address");
        }
    }



    return (
        <section id="subscribe" className="container-grid padding-large position-relative overflow-hidden">
            <div className="container">
                <div className="row">
                    <div className="subscribe-content bg-dark d-flex flex-wrap justify-content-center align-items-center padding-medium">
                        <div className="col-md-6 col-sm-12">
                            <div className="display-header pe-3">
                                <h2 className="display-7 text-uppercase text-light">Subscribe Us Now</h2>
                                <p>Get latest news, updates and deals directly mailed to your inbox.</p>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-12">
                            <p className='text-light'>{message}</p>
                            <form className="subscription-form validate" onSubmit={postData}>
                                <div className="input-group flex-wrap">
                                    <input className="form-control btn-rounded-none" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Your email address here" />
                                    <button className="btn btn-medium btn-secondary text-uppercase btn-rounded-none" type="submit" name="subscribe">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

import React, { useEffect, useState } from 'react'

import { getTestimonial } from "../Store/ActionCreators/TestimonialActionCreators"
import { useDispatch, useSelector } from 'react-redux'
export default function Testimonials() {
    let [testimonial, setTestimonial] = useState([])

    let dispatch = useDispatch()
    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)
    function getAPIData() {
        dispatch(getTestimonial())
        if (TestimonialStateData.length) {
            setTestimonial(TestimonialStateData.slice(0, 12))
        }
    }
    useEffect(() => {
        getAPIData()
    }, [TestimonialStateData.length])
    return (
        <>
            <div id="carouselExample" className="carousel slide my-3">
                <div className="carousel-inner">
                    {
                        testimonial.map((item, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <div className="swiper-slide d-flex flex-column justify-content-center align-items-center">
                                    <div className="author-detail mb-3 " style={{ display: "grid", placeItems: 'center', justifyContent: "center" }}>
                                        <img src={`/images/${item.pic}`} height={100} width={100} className="rounded-circle" alt="" />
                                        <div className="name text-dark text-uppercase pt-2 fa-2x">{item.name}</div>
                                    </div>
                                    <div className="review-item col-md-10 text-center">
                                        <i className="icon icon-review"></i>
                                        <blockquote className='testimonial-message'>“{item.message}”</blockquote>
                                        <div className="rating">
                                            <i className='fa fa-star'></i>
                                            <i className='fa fa-star'></i>
                                            <i className='fa fa-star'></i>
                                            <i className='fa fa-star'></i>
                                            <i className='fa fa-star'></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="material-symbols-outlined fs-1 text-dark">
                        arrow_back_ios
                    </span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="material-symbols-outlined fs-1 text-dark">
                        arrow_forward_ios
                    </span>
                </button>
            </div>


        </>
    )
}

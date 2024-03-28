import React from 'react'
import { Link } from 'react-router-dom'

export default function MyWomenCards(props) {
    return (
        <>
            <div className="col mb-5">
                <div className="card h-100" style={{ width: "250px" }}>

                    <div className="badge bg-dark text-white position-absolute" style={{ top: "0.5rem", right: "0.5rem" }}>Sale</div>

                    <img className="card-img-top photo-card " src={props.pic} alt="..." />

                    <div className="card-body p-4">
                        <div className="text-center">

                            <h5 className="fw-bolder" style={{ fontSize: "18px" }}>{props.name}</h5>
                            &#8377;<del className='text-danger'>{props.baseprice}</del>    {props.discount}%off
                            <p className='text-success'>

                                &#8377;{props.finalprice}
                            </p>
                        </div>
                    </div>

                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center"><Link className="btn btn-outline-dark mt-auto" to={`/product/${props.id}`}>Add to cart</Link></div>
                    </div>
                </div>
            </div>

        </>
    )
}

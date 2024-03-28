import React, { useEffect, useState } from 'react'
import Mycard from './Mycard';
import { getProduct } from '../Store/ActionCreators/ProductActionCreator';
import { useDispatch, useSelector } from 'react-redux'
import TestimonialCard from './TestimonialCard';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';


export default function Home() {

  let [products, setProducts] = useState([])
  let [maleProducts, setMaleProducts] = useState([])
  let [femaleProducts, setFemaleProducts] = useState([])
  let [kidsProducts, setKidsProducts] = useState([])

  let dispatch = useDispatch()
  let ProductStateData = useSelector((state) => state.ProductStateData)

  function getApiData() {
    dispatch(getProduct())
    if (ProductStateData.length) {

      const shuffledData = shuffleArray(ProductStateData);  //isme kya kiya randomly aayenge product

      setProducts(shuffledData.slice(0, shuffledData.length))
      setMaleProducts(ProductStateData.filter((X) => X.maincategory === "Male").slice(0, 12))
      setFemaleProducts(ProductStateData.filter((X) => X.maincategory === "Female").slice(0, 12))
      setKidsProducts(ProductStateData.filter((X) => X.maincategory === "Male").slice(0, 12))
    }
  }


  // Function to shuffle an array using the Fisher-Yates algorithm

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];   // Swap elements at indices i and j
    }
    return array;
  }

  useEffect(() => {
    getApiData()
  }, [ProductStateData.length])




  return (
    <>

      {/* carousel */}
      <div className='container-fluid p-0 ' >
        <div id="carouselExampleCaptions" className="carousel slide cr-first">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner cr-first">
            <div className="carousel-item active">
              <img src="images/c3_upscaled.jpg" className="d-block cr-first w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Latest Design Shoes</h5>
                {/* <p>Some representative placeholder content for the first slide.</p> */}
              </div>
            </div>
            <div className="carousel-item cr-first">
              <img src="images/c2_upscaled.jpg" className="d-block cr-first w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                {/* <p>Some representative placeholder content for the second slide.</p> */}
              </div>
            </div>
            <div className="carousel-item cr-first">
              <img src="images/c1_upscaled.jpg" className="d-block cr-first w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Lates Blue Design Shoe's</h5>
                {/* <p>Some representative placeholder content for the third slide.</p> */}
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">

            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">

            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
        </div>
      </div >


      {/* company services */}
      <ScrollAnimation animateIn="fadeIn"  >

        <section id="company-services" className="py-5 px-1 my-10">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 pb-3">
                <div className="icon-box d-flex">
                  <div className="icon-box-icon pe-3 pb-3">
                    <span className="material-symbols-outlined">shopping_cart</span>
                  </div>
                  <div className="icon-box-content">
                    <h3 className="card-title text-uppercase text-dark">Free delivery</h3>
                    <p>Consectetur adipi elit lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 pb-3">
                <div className="icon-box d-flex">
                  <div className="icon-box-icon pe-3 pb-3">
                    <span className="material-symbols-outlined">new_releases</span>

                  </div>
                  <div className="icon-box-content">
                    <h3 className="card-title text-uppercase text-dark">Quality guarantee</h3>
                    <p>Dolor sit amet orem ipsu mcons ectetur adipi elit.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 pb-3">
                <div className="icon-box d-flex">
                  <div className="icon-box-icon pe-3 pb-3">
                    <span className="material-symbols-outlined">sell</span>

                  </div>
                  <div className="icon-box-content">
                    <h3 className="card-title text-uppercase text-dark">Daily offers</h3>
                    <p>Amet consectetur adipi elit loreme ipsum dolor sit.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 pb-3">
                <div className="icon-box d-flex">
                  <div className="icon-box-icon pe-3 pb-3">
                    <span className="material-symbols-outlined">verified_user</span>

                  </div>
                  <div className="icon-box-content">
                    <h3 className="card-title text-uppercase text-dark">100% secure payment</h3>
                    <p>Rem Lopsum dolor sit amet, consectetur adipi elit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>




      {/* <card></card> */}
      <ScrollAnimation animateIn="fadeIn"  >

        <div className='pg' style={{ padding: "5px", marginTop: "10px" }}>
          <p style={{ fontSize: "2rem", fontFamily: "cursive", color: "black" }}>Latest's Design</p>
        </div>
        <div className=' js'>
          <div id="product-container">
            {products.map((item, index) => (
              <Mycard key={index} pic={`/images/${item.pic[0]}`} name={item.name} id={item.id} baseprice={item.baseprice} discount={item.discount} finalprice={item.finalprice} />
            ))}
          </div>
        </div>
      </ScrollAnimation>



      {/* section */}
      <ScrollAnimation animateIn="fadeIn">

        <section className="py-5" style={{ border: "2px solid black" }}>

          <div className="container px-4 px-lg-5 mt-5 ">
            <div className="row gx-4 gx-lg-5  row-cols-1   row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {maleProducts.map((item, index) => (
                <div key={index} className="col mb-5">
                  <div className="card h-100">
                    <img className="card-img-top photo-card" src={`/images/${item.pic[0]}`} alt="..." />
                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{item.name}</h5>
                        ₹ {item.baseprice}  - {item.discount}%off <br />
                        ₹ {item.finalprice}
                      </div>
                    </div>
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center"><Link className="btn btn-outline-dark mt-auto" to={`/product/${item.id}`}>Add to cart</Link></div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/*  */}

      {/* <femalecard> */}
      <ScrollAnimation animateIn="fadeIn"  >

        <div className='pg' style={{ padding: "5px" }}>
          <p style={{ fontSize: "2rem", fontFamily: "cursive", color: "black" }}>Women's Design</p>
        </div>
        <div className=' js'>
          <div id="product-container">
            {femaleProducts.map((item, index) => (
              <Mycard key={index} pic={`/images/${item.pic[0]}`} name={item.name} id={item.id} baseprice={item.baseprice} discount={item.discount} finalprice={item.finalprice} />
            ))}
          </div>
        </div>
      </ScrollAnimation>



      {/* discount image */}
      <ScrollAnimation animateIn="fadeIn"  >

        <section id="yearly-sale" className="bg-light-blue overflow-hidden mt-5 padding-large" style={{ backgroundImage: "url('images/single-image1.png')", backgroundPosition: "right", backgroundRepeat: "no-repeat" }}>
          <div className="row d-flex flex-wrap align-items-center">
            <div className="col-md-6 col-sm-12">
              <div className="text-content offset-4 padding-medium">
                <h3 className='text-primary'>10% off</h3>
                <h2 className="display-2 pb-5 text-uppercase text-primary" style={{ fontWeight: "bolder" }}>New year sale</h2>
                <a href="shop.html" className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Sale</a>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">

            </div>
          </div>
        </section>
      </ScrollAnimation>


      <ScrollAnimation animateIn="fadeIn"  >
        <TestimonialCard />
      </ScrollAnimation>

      {/* newsletter */}
      <ScrollAnimation animateIn="fadeIn"  >
        <Newsletter />
      </ScrollAnimation>

    </>
  )
}

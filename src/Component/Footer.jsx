import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <footer id="footer" className="footer">
        <div className="container" >
          <div className="row">
            <div className="footer-top-area">
              <div className="row d-flex flex-wrap justify-content-between">
                <div className="col-lg-3 col-sm-6 pb-3">
                  <div className="footer-menu">
                    <img src="images/main-logo.png" alt="logo" />
                    <p>Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit. Gravida massa volutpat aenean odio erat nullam fringilla.</p>
                    <div className="social-links ">
                      <ul className="d-flex list-unstyled">
                        <li>
                          <a href="/">

                            <i className="fa fa-facebook"></i>

                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <i className="fa fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="/">

                            <i className="fa fa-linkedin"></i>

                          </a>
                        </li>
                        <li>
                          <a href="/">

                            <i className="fa fa-youtube"></i>

                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-sm-6 pb-3">
                  <div className="footer-menu text-uppercase">
                    <h5 className="widget-title  pb-2">Quick Links</h5>
                    <ul className="menu-list list-unstyled text-uppercase">
                      <li className="menu-item pb-2" >
                        <a href="/" style={{ color: "black" }}>Home</a>
                      </li>
                      <li className="menu-item pb-2">
                        <a href="/" style={{ color: "black" }}>About</a>
                      </li>
                      <li className="menu-item pb-2">
                        <Link to="/shop" style={{ color: "black" }}>Shop</Link>

                      </li>
                      <li className="menu-item pb-2">
                        <a href="/" style={{ color: "black" }}>Blogs</a>
                      </li>
                      <li className="menu-item pb-2">
                        <Link to="/contact-us" style={{ color: "black" }}>Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 pb-3">
                  <div className="footer-menu text-uppercase">
                    <h5 className="widget-title pb-2">Help & Info Help</h5>
                    <ul className="menu-list list-unstyled">
                      <li className="menu-item pb-2">
                        <a href="/" style={{ color: "black" }}>Track Your Order</a>
                      </li>
                      <li className="menu-item pb-2">
                        <a href="/" style={{ color: "black" }}>Returns Policies</a>
                      </li>
                      <li className="menu-item pb-2">
                        <a href="/" style={{ color: "black" }}>Shipping + Delivery</a>
                      </li>
                      <li className="menu-item pb-2">
                        <a href="/" style={{ color: "black" }}>Contact Us</a>
                      </li>
                      <li className="menu-item pb-2">
                        <a href="/" style={{ color: "black" }}>Faqs</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 pb-3">
                  <div className="footer-menu contact-item">
                    <h5 className="widget-title text-uppercase pb-2">Contact Us</h5>
                    <p>Do you have any queries or suggestions? <a href="mailto:" style={{ color: "black", fontWeight: "bold" }}>yourinfo@gmail.com</a>
                    </p>
                    <p>If you need support? Just give us a call. <a href="" style={{ color: "black", fontWeight: "bold" }}>+55 111 222 333 44</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </footer>
    </>
  )
}

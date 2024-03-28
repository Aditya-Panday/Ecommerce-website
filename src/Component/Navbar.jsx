import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  let navigate = useNavigate()
  function logout() {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <>
      <nav className="navbar border-bottom border-body navbar-expand-lg bg-body-tertiary " style={{ backgroundColor: "e3f2fd" }}>
        <div className="container-fluid">
          <Link className="navbar-brand " to="/" style={{ fontSize: "2rem", fontFamily: "cursive" }}>DOTFITS</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mx-2" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">HOME</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/shop?mc=Male">MENS</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/shop?mc=Female">WOMENS</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/shop?mc=Kids">KIDS</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/shop">SHOP</Link>
              </li>
              {
                localStorage.getItem("role") === "Admin" ?
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/admin">ADMIN</Link>
                  </li>
                  : ""
              }

              {
                localStorage.getItem("login") ?
                  <li className="nav-item dropdown">
                    <a className="nav-link me-4 dropdown-toggle link-dark" data-bs-toggle="dropdown" href="/" role="button" aria-expanded="false">{localStorage.getItem("name")}</a>
                    <ul className="dropdown-menu">
                      {
                        localStorage.getItem("role") === "user" ?
                          <>
                            <li>
                              <Link to="/profile" className="dropdown-item">Profile</Link>
                            </li>
                            <li>
                              <Link to="/cart" className="dropdown-item">Cart</Link>
                            </li>
                            <li>
                              <Link to="/checkout" className="dropdown-item">Checkout</Link>
                            </li>
                          </> :
                          <li>
                            <Link to="/profile" className="dropdown-item">Profile</Link>
                          </li>


                      }
                      <li>
                        <button className="dropdown-item" onClick={logout}>Logout</button>
                      </li>
                    </ul>
                  </li> :
                  <li className="nav-item">
                    <Link className="nav-link me-4" to="/login">Login</Link>
                  </li>
              }


            </ul>
            {/* <form className="d-flex " role="search">
              <input className="form-control me-2 " style={{ width: "150px" }} type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-dark" type="submit">Search</button>
            </form> */}

            <ul style={{ display: "flex", marginTop: "15px", color: "black" }}>
              <li className="me-3" style={{ listStyle: "none" }}>
                <Link to="/signup">
                  <span className="material-symbols-outlined" title="Account">person</span>

                </Link>
              </li>
              <li className="me-3" style={{ listStyle: "none" }}>
                <Link to="cart.html">

                  <span className="material-symbols-outlined">shopping_cart</span>

                </Link>
              </li>
            </ul>

          </div>
        </div>
      </nav>


    </>
  )
}

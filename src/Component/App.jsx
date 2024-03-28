import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Home'
import Footer from './Footer'
import AdminHome from './Admin/Home/AdminHome'

// Maincategory
import Maincategory from './Admin/Maincategory/Maincategory';
import CreateMaincategory from './Admin/Maincategory/CreateMaincategory';
import UpdateMainCategory from './Admin/Maincategory/UpdateMaincategory';

// Subcategory
import CreateSubcategory from './Admin/Subcategory/CreateSubcategory';
import SubMaincategory from './Admin/Subcategory/SubMaincategory';
import UpdateSubcategory from './Admin/Subcategory/UpdateSubcategory';

// Brand
import CreateBrand from './Admin/Brand/CreateBrand';
import UpdateBrand from './Admin/Brand/UpdateBrand';
import BrandMain from './Admin/Brand/BrandMain'

// Product
import CreateProduct from './Admin/Product/CreateProduct';
import ProductMain from './Admin/Product/ProductMain';
import UpdateProduct from './Admin/Product/UpdateProduct';

// Testimonial 
import Testimonial from './Admin/Testimonial/Testimonial'
import CreateTestimonial from './Admin/Testimonial/CreateTestimonial'
import UpdateTestimonial from './Admin/Testimonial/UpdateTestimonial'

import Shop from './Shop'
import SingleProduct from './SingleProduct'
import Signup from './Signup'
import Login from './Login'
import Profile from './profile'
import UpdateProfile from './UpdateProfile'
import Cart from './Cart'
import Checkout from './Checkout'
import Confirmation from './Confirmation'
import ContactUs from './ContactUs'


export default function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/confirmation' element={<Confirmation />} />
          <Route path='/contact-us' element={<ContactUs />} />

          {/* <Route path="/admin" element={<AdminHome />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
          {
            localStorage.getItem("role") === "Admin" ?
              <Route path="/admin" element={<AdminHome />} />

              : <Route path="/" element={<Home />} />
          }

          {/* Maincategory */}
          <Route path="/admin/maincategory" element={<Maincategory />} />
          <Route path="/admin/maincategory/create" element={<CreateMaincategory />} />
          <Route path="/admin/maincategory/update/:id" element={<UpdateMainCategory />} />

          {/* Subcategory */}
          <Route path="/admin/subcategory" element={< SubMaincategory />} />
          <Route path="/admin/subcategory/create" element={<CreateSubcategory />} />
          <Route path="/admin/subcategory/update/:id" element={<UpdateSubcategory />} />

          {/* Brands */}
          <Route path="/admin/brands" element={< BrandMain />} />
          <Route path="/admin/brands/create" element={<CreateBrand />} />
          <Route path="/admin/brands/update/:id" element={<UpdateBrand />} />

          {/* Products */}
          <Route path="/admin/product" element={< ProductMain />} />
          <Route path="/admin/product/create" element={<CreateProduct />} />
          <Route path="/admin/product/update/:id" element={<UpdateProduct />} />

          {/* Testimonail */}
          <Route path='/admin/testimonial' element={<Testimonial />} />
          <Route path='/admin/testimonial/create' element={<CreateTestimonial />} />
          <Route path='/admin/testimonial/update/:id' element={<UpdateTestimonial />} />


        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
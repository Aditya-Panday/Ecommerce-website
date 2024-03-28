import { combineReducers } from "@reduxjs/toolkit";

import MaincategoryReducer from "./MaincategoryReducer"
import SubcategoryReducer from "./SubcategoryReducer"
import BrandReducer from "./BrandReducer"
import ProductReducer from "./ProductReducer"
import TestimonialReducer from "./TestimonialReducer";
import CheckoutReducer from "./CheckoutReducer";
import CartReducer from "./CartReducer";
import ContactUsReducer from "./ContactUsReducer";
import NewsletterReducer from "./NewsletterReducer";
import WishlistReducer from "./WishlistReducer";

export default combineReducers({
    MaincategoryStateData: MaincategoryReducer,
    SubcategoryStateData: SubcategoryReducer,
    BrandStateData: BrandReducer,
    ProductStateData: ProductReducer,
    TestimonialStateData: TestimonialReducer,
    CheckoutReducer: CheckoutReducer,
    CartReducer: CartReducer,
    ContactUsReducer: ContactUsReducer,
    NewsletterReducer: NewsletterReducer,
    WishlistReducer: WishlistReducer



})
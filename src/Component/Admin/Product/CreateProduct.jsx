import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// npm i react-draft-wysiwyg  
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
// npm install draftjs-to-html

import draftToHtml from 'draftjs-to-html';

import Sidebar from '../Sidebar'

import formValidations from "../../Validations/formValidations"
import { addProduct } from "../../../Store/ActionCreators/ProductActionCreator"
import { getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators"
import imageValidations from '../../Validations/imageValidations'

export default function CreateBrand() {

  let [maincategory, setMaincategory] = useState([])
  let [subcategory, setSubcategory] = useState([])
  let [brand, setBrand] = useState([])
  let [description, setDescription] = useState(EditorState.createEmpty())
  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: "",
    size: "",
    baseprice: "",
    discount: "",
    finalprice: "",
    stock: "In Stock",
    pic: [],


  })

  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    color: "Color Field is Mendatory",
    size: "Size Field is Mendatory",
    baseprice: "Base Field is Mendatory",
    discount: "Discount Field is Mendatory",
    pic: "Upload Atleast 1 Pic",
  })

  let [show, setShow] = useState(false)
  let navigate = useNavigate()

  // let ProductStateData = useSelector((state) => state.ProductStateData)
  let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
  let BrandStateData = useSelector((state) => state.BrandStateData)
  let dispatch = useDispatch()

  function getInputData(e) {
    var { name, value } = e.target
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: formValidations(e)
      }
    })

    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }
  // for pics upload function..
  function getInputFile(e) {
    var { files } = e.target
    var error = imageValidations(e)
    if (error)
      setShow(true)
    setErrorMessage((old) => {
      return {
        ...old,
        pic: error
      }
    })
    setData((old) => {
      return {
        ...old,
        'pic': Array.from(files).map((x) => x.name)
      }
    })
  }

  async function postData(e) {
    e.preventDefault()
    if (Object.values(errorMessage).find((x) => x && x.length !== 0)) {
      setShow(true)
    }
    else {
      let baseprice = parseInt(data.baseprice)
      let discount = parseInt(data.discount)
      let finalprice = parseInt(baseprice - baseprice * discount / 100)
      let item = {
        name: data.name,
        maincategory: data.maincategory,
        subcategory: data.subcategory,
        brand: data.brand,
        color: data.color,
        size: data.size,
        baseprice: baseprice,
        discount: discount,
        finalprice: finalprice,
        stock: data.stock,
        description: draftToHtml(convertToRaw(description.getCurrentContent())),
        pic: data.pic
      }
      // console.log(item);
      dispatch(addProduct({ ...item }))
      navigate("/admin/product")
    }
  }
  function getAPIData() {
    dispatch(getMaincategory())
    let mc = ""
    let sc = ""
    let br = ""
    if (MaincategoryStateData.length) { //agar data hai toh setmain mai pass krdiya hai niche
      setMaincategory(MaincategoryStateData)
      mc = MaincategoryStateData[0].name
    }
    dispatch(getSubcategory())
    if (SubcategoryStateData.length) {
      setSubcategory(SubcategoryStateData)
      sc = SubcategoryStateData[0].name
    }
    dispatch(getBrand())
    if (BrandStateData.length) {
      setBrand(BrandStateData)
      br = BrandStateData[0].name
    }
    if (mc && sc && br) {
      setData((old) => {        //old data as it is aayega
        return {
          ...old,               //old data ko call krenge
          'maincategory': mc,
          'subcategory': sc,
          'brand': br
        }
      })
    }
  }
  useEffect(() => {
    getAPIData()
  }, [MaincategoryStateData.length, BrandStateData.length, SubcategoryStateData.length])


  return (
    <div className='container-fluid my-2'>
      <div className='row'>
        <div className='col-md-3 col-sm-4'>
          <Sidebar />
        </div>
        <div className='col-md-9'>
          <h4 className='bg-primary p-2 text-light text-center '>Create Product <Link to="/admin/Product" className='float-end text-dark'>Back</Link> </h4>
          <form onSubmit={postData}>
            <div className='mb-3'>
              <label>Name<span className='="text-danger'>*</span></label>
              <input type="text" name="name" onChange={getInputData} placeholder='Product Name' className='form-control' />
              {show ? <p className='text-danger text-capitalize py-1'>{errorMessage.name}</p> : ""}
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-3">
                <label>Maincategory<span className='text-danger'>*</span></label>
                <select name="maincategory" onChange={getInputData} className='form-select'>
                  {
                    maincategory.map((item, index) => {
                      return <option key={index}>{item.name}</option>
                    })
                  }
                </select>
              </div>

              <div className="col-lg-3 col-md-6 mb-3">
                <label>Subcategory<span className='text-danger'>*</span></label>
                <select name="subcategory" onChange={getInputData} className='form-select'>
                  {
                    subcategory.map((item, index) => {
                      return <option key={index}>{item.name}</option>
                    })
                  }
                </select>
              </div>

              <div className="col-lg-3 col-md-6 mb-3">
                <label>Brand<span className='text-danger'>*</span></label>
                <select name="brand" onChange={getInputData} className='form-select'>
                  {
                    brand.map((item, index) => {
                      return <option key={index}>{item.name}</option>
                    })
                  }
                </select>
              </div>

              <div className="col-lg-3 col-md-6 mb-3">
                <label>Stock<span className='text-danger'>*</span></label>
                <select name="stock" onChange={getInputData} className='form-select'>
                  <option>In Stock</option>
                  <option>Out Of Stock</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Color<span className='text-danger'>*</span></label>
                <input type="text" name="color" onChange={getInputData} placeholder='Product Color' className='form-control mt-1' />
                {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.color}</p> : ""}
              </div>

              <div className="col-md-6 mb-3">
                <label>Size<span className='text-danger'>*</span></label>
                <input type="text" name="size" onChange={getInputData} placeholder='Product Size' className='form-control mt-1' />
                {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.size}</p> : ""}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Base Price<span className='text-danger'>*</span></label>
                <input type="number" name="baseprice" onChange={getInputData} placeholder='Product Base Price' className='form-control mt-1' />
                {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.baseprice}</p> : ""}
              </div>

              <div className="col-md-6 mb-3">
                <label>Discount<span className='text-danger'>*</span></label>
                <input type="number" name="discount" onChange={getInputData} placeholder='Discount on Product' className='form-control mt-1' />
                {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.discount}</p> : ""}
              </div>
            </div>

            <div className="mb-3 border ">
              <label>Description</label>
              <Editor
                editorState={description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editorState) => setDescription(editorState)}
              />
            </div>

            <div className="mb-3">
              <label>Product Pics<span className='text-danger'>*</span></label>
              <input type="file" name="pic" onChange={getInputFile} multiple className='form-control' />
              {show ? <p className='text-danger text-capitalize py-2'>{errorMessage.pic}</p> : ""}
            </div>


            <div className='mb-3'>
              <button type="submit" className="btn btn-primary w-100">Create</button>
            </div>

          </form>
        </div>
      </div>

    </div>

  )
}

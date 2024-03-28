import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Sidebar from '../Sidebar'

import formValidations from "../../Validations/formValidations"
import { addBrand, getBrand } from "../../../Store/ActionCreators/BrandActionCreators"

export default function CreateBrand() {
  let [data, setData] = useState({
    name: ""
  })
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory"
  })
  let [show, setShow] = useState(false)
  let navigate = useNavigate()

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
  async function postData(e) {
    e.preventDefault()
    if (Object.values(errorMessage).find((x) => x && x.length !== 0)) {
      setShow(true)
    }
    else {
      let item = BrandStateData.find((x) => x.name === data.name)
      if (item) {
        setShow(true)
        setErrorMessage((old) => {
          return {
            ...old,
            'name': "Already Exist"
          }
        })
      }
      else {
        dispatch(addBrand({ name: data.name }))
        navigate("/admin/brands")
      }
    }
  }
  function getAPIData() {
    dispatch(getBrand())
  }
  useEffect(() => {
    getAPIData()
  }, [BrandStateData.length])
  return (
    <div className='container-fluid my-2'>
      <div className='row'>
        <div className='col-md-3 col-sm-4'>
          <Sidebar />
        </div>
        <div className='col-md-9'>
          <h4 className='bg-primary p-2 text-light text-center '>Create Brand <Link to="/admin/brands" className='float-end text-dark'>Back</Link> </h4>
          <form onSubmit={postData}>
            <div className='mb-3'>
              <label>Name<span className='="text-danger'>*</span></label>
              <input type="text" name="name" onChange={getInputData} placeholder='Brand Name' className='form-control' />
              {show ? <p className='text-danger text-capitalize py-1'>{errorMessage.name}</p> : ""}
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

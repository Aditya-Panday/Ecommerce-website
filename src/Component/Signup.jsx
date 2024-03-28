import React, { useState } from 'react'
import formValidations from './Validations/formValidations'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState({
        name: "Name field is mendatory",
        username: "User Name field is mendatory",
        email: "Email field is mendatory",
        phone: "Phone field is mendatory",
        password: "Password field is mendatory",
    })
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })
    function getInputData(e) {
        let { name, value } = e.target
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
        if (data.password !== data.cpassword) {
            setShow(true)
            setErrorMessage((old) => {
                return {
                    ...old,
                    "password": "Passwords & Confirm Password doesn't match"
                }
            })
        }
        else if (Object.values(errorMessage).find((x) => x && x.length !== 0)) {
            setShow(true)
        }
        else {
            let response = await fetch("http://localhost:8000/user", {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            response = await response.json()
            let item = response.find((x) => x.username === data.username || x.email === data.email)

            if (item) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'username': item.username === data.username ? "Username Already Taken" : "",
                        'email': item.email === data.email ? "Email Already Exists" : "",

                    }
                })
            }
            else {
                item = {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    role: "user"
                }
                response = await fetch("http://localhost:8000/user", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(item)
                })
                response = await response.json()
                navigate("/login")
            }
        }
    }


    return (
        <>
            <div className='container-fluid my-5'>
                <div style={{ height: 50 }}></div>
                <div className='row'>
                    <div className="col-md-8 col-sm-10 col-12 m-auto">
                        <h5 className='bg-primary text-light text-center p-2'><strong>Create</strong> a Free Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={getInputData} className='form-control' placeholder='Full Name' />
                                    {show ? <p className='text-capitalize px-2'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>User Name</label>
                                    <input type="text" name="username" onChange={getInputData} className='form-control' placeholder='User Name' />
                                    {show ? <p className='text-capitalize px-2'>{errorMessage.username}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Email</label>
                                    <input type="email" name="email" onChange={getInputData} className='form-control' placeholder='Email' />
                                    {show ? <p className='text-capitalize px-2'>{errorMessage.email}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Phone</label>
                                    <input type="phone" name="phone" onChange={getInputData} className='form-control' placeholder='Phone' />
                                    {show ? <p className='text-capitalize px-2'>{errorMessage.phone}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Password</label>
                                    <input type="password" name="password" onChange={getInputData} className='form-control' placeholder='Password' />
                                    {show ? <p className='text-capitalize px-2'>{errorMessage.password}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Confirm Password</label>
                                    <input type="cpassword" name="cpassword" onChange={getInputData} className='form-control' placeholder='Confirm Password' />
                                    {show ? <p className='text-capitalize px-2'>{errorMessage.cpassword}</p> : ""}
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type='submit' className='btn btn-primary text-light w-100'>Submit</button>
                            </div>
                            <Link to="/login">Already Have an Account?Login</Link>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

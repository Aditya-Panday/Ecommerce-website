import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminHome() {
  // profile ka data
  let [user, setUser] = useState({})
  let navigate = useNavigate()

  async function getAPIData() {
    let response = await fetch("http://localhost:8000/user/" + localStorage.getItem("userid"), {
      method: "get",
      headers: {
        "content-type": "application-json"
      }
    })
    response = await response.json()
    if (response) {
      setUser(response)
    }
    else {
      navigate("/login")
    }
  }
  useEffect(() => {
    getAPIData()
  }, [])
  return (
    <div className='container-fluid my-2'>
      <div className='row'>
        <div className='col-md-3 col-sm-4'>
          <Sidebar />
        </div>
        <div className='col-md-9'>
          <h4 className='bg-primary p-2 text-light text-center '>Admin Panel</h4>
          <div className='row'>
            <div className='col-md-6'>
              {
                user.pic ?
                  <img src={`/images/${user.pic}`} height={250} width="80%" /> :
                  <img src={`/images/noimage.png`} height={250} width="100%" />
              }
            </div>
            <div className='col-md-6'>
              <table className='table table-bordered table-hover'>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>User Name</td>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <td>Email Address</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{user.phone}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}><Link to="/profile/update" className='btn btn-primary w-100'>Update Profile</Link> </td>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

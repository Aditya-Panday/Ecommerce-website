import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteProduct, getProduct } from "../../../Store/ActionCreators/ProductActionCreator"
export default function BrandMain() {
  let [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  let dispatch = useDispatch()
  let ProductStateData = useSelector((state) => state.ProductStateData)

  async function deleteItem(id) {
    if (window.confirm("Are You Sure to Delete this Item :  ")) {
      dispatch(deleteProduct({ id: id }))
      getAPIData()
    }
  }
  async function getAPIData() {
    dispatch(getProduct())
    if (ProductStateData.length) {
      setData(ProductStateData)
    }
  }
  useEffect(() => {
    getAPIData()
  }, [ProductStateData.length])

  const handleSearch = (searchTerm) => {
    const firstWord = searchTerm.toLowerCase();
    setSearchTerm(firstWord);
    const filteredData = ProductStateData.filter((item) =>
      item.name.toLowerCase().startsWith(firstWord)
    );
    setData(filteredData);
    setCurrentPage(1); // Reset to first page after search
  };

  // Logic to get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Logic to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className='container-fluid my-2'>
      <div className='row'>
        <div className='col-md-3 col-sm-4'>
          <Sidebar />
        </div>
        <div className='col-md-9'>
          <h4 className='bg-primary p-2 text-light text-center '> Products <Link to="/admin/product/create"><i className='fa fa-plus float-end text-dark '></i></Link> </h4>
          <div className="table-responsive">
            <table className="table table-bordered  table-hover table-striped">
              <thead>
                <tr>
                  <th colSpan={14}>
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Search by name"
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </th>
                </tr>
              </thead>
              <thead>
                <tr>

                  <th>ID</th>
                  <th>Name</th>
                  <th>Maincategory</th>
                  <th>Subcategory</th>
                  <th>Brand</th>
                  <th>BasePrice</th>
                  <th>Discount</th>
                  <th>Final Price</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Stock</th>
                  <th>Pics</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentItems.map((item, index) => {
                    return <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.maincategory}</td>
                      <td>{item.subcategory}</td>
                      <td>{item.brand}</td>
                      <td>&#8377;{item.baseprice}</td>
                      <td>&#8377;{item.discount}</td>
                      <td>&#8377;{item.finalprice}</td>
                      <td>{item.color}</td>
                      <td>{item.size}</td>
                      <td>{item.stock}</td>
                      <td style={{display:'flex'}}>{item.pic.length ?
                        <>
                          {
                            item.pic.map((p, i) => {
                              return <a key={i} href={`/images/${p}`} target='_blank' rel='noreferrer'>
                                <img src={`/images/${p}`} style={{ border: "2px solid #D21312", marginBottom: "1px" }} height={30} width={30} alt="" />
                              </a>
                            })
                          }
                        </>
                        : "No Images"}
                      </td>
                      <td><Link className="btn btn-primary" to={`/admin/product/update/${item.id}`}><i className='fa fa-edit'></i></Link></td>
                      <td><button className='btn btn-danger' onClick={() => deleteItem(item.id)}><i className='fa fa-trash'></i></button></td>
                    </tr>
                  })
                }
              </tbody>
            </table>
            {/* Pagination */}
            <nav>
              <ul className="pagination">
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => {
                  const page = index + 1;
                  if (
                    page === currentPage ||
                    page === currentPage - 1 ||
                    page === currentPage + 1 ||
                    page === 1 ||
                    page === Math.ceil(data.length / itemsPerPage)
                  ) {
                    return (
                      <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button onClick={() => paginate(page)} className="page-link">{page}</button>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>

    </div>
  )
}

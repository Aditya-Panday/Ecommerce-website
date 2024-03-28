import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteSubcategory, getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators"
export default function SubMaincategory() {
  let [data, setData] = useState([])
  let dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)

  async function deleteItem(id) {
    if (window.confirm("Are You Sure to Delete this Item :  ")) {
      dispatch(deleteSubcategory({ id: id }))
      getAPIData()
    }
  }
  async function getAPIData() {
    dispatch(getSubcategory())
    if (SubcategoryStateData.length) {
      setData(SubcategoryStateData)
    }
  }
  useEffect(() => {
    getAPIData()
  }, [SubcategoryStateData.length])

  const handleSearch = (searchTerm) => {
    const firstWord = searchTerm.toLowerCase();
    setSearchTerm(firstWord);
    const filteredData = SubcategoryStateData.filter((item) =>
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
          <h4 className='bg-primary p-2 text-light text-center'> Subcategory <Link to="/admin/subcategory/create"><i className='fa fa-plus float-end text-dark '></i></Link> </h4>
          <table className='table table-bordered  table-hover table-dark' >
            <thead>
              <tr>
                <th colSpan={4}>
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
                <th>Edit </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((item, index) => {
                  return <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td><Link className="btn btn-primary" to={`/admin/subcategory/update/${item.id}`}><i className='fa fa-edit'></i></Link></td>
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
  )
}

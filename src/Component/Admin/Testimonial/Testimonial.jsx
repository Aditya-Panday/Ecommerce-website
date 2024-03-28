import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteTestimonial, getTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators";

export default function Testimonial() {
  let [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const dispatch = useDispatch();

  let TestimonialStateData = useSelector((state) => state.TestimonialStateData)
  // const TestimonialStateData = useSelector((state) => state.TestimonialStateData) || [];

  const deleteItem = async (id) => {
    if (window.confirm("Are You Sure to Delete this Item :  ")) {
      dispatch(deleteTestimonial({ id: id }))
      getAPIData()
    }
  }
  const getAPIData = async () => {
    dispatch(getTestimonial());
    if (TestimonialStateData.length) {
      setData(TestimonialStateData)
    }
    // setData(TestimonialStateData); // Update data directly here
  }

  useEffect(() => {
    getAPIData();
  }, [TestimonialStateData.length]);



  const handleSearch = (searchTerm) => {
    if (!TestimonialStateData) return;

    const firstWord = searchTerm.toLowerCase();
    setSearchTerm(firstWord);
    const filteredData = TestimonialStateData.filter((item) =>
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
      <div className="row">
        <div className="col-md-3"><Sidebar /></div>
        <div className="col-md-9">
          <h5 className='bg-primary p-2 text-center'>Testimonial <Link to="/admin/testimonial/create" className='btn btn-secondary'><i className='fa fa-plus float-end text-light'></i></Link></h5>
          <table className='table table-bordered table-hover ' >
            <thead>
              <tr>
                <th colSpan={7}>
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
                <th>Pic</th>
                <th>Star</th>
                <th>Message</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.pic ? (
                      <a href={`/images/${item.pic}`} target="_blank" rel="noreferrer">
                        <img
                          src={`/images/${item.pic}`}
                          style={{ border: "1px solid green", marginBottom: "1px" }}
                          height={50}
                          width={70}
                          alt=""
                        />
                      </a>
                    ) : (
                      "No Images"
                    )}
                    </td>
                    <td>{item.star}</td>
                    <td>{item.message}</td>
                    <td><Link className="btn btn-primary" to={`/admin/testimonial/update/${item.id}`}><i className='fa fa-edit'></i></Link></td>
                    <td><button className='btn btn-danger' onClick={() => deleteItem(item.id)}><i className='fa fa-trash'></i></button></td>
                  </tr>
                ))
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

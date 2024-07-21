import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Users = () => {

  const [user , setUser]=useState([]);

  // we fetch data inside an useEffect to avoid an infinity loop since when the component will render it will fetch the data and will cause a rerender . and this process continues.
  useEffect(()=>{
    axios.get('http://localhost:3001')
    .then(result=>setUser(result.data))
    .catch(err=>console.log('error during fetching users data ' , err))
  },[])


  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then((res) => {
        console.log(res);
        // Update the state to remove the deleted user
        setUser(prevUsers => prevUsers.filter(user => user._id !== id));
      })
      .catch(err => console.log('Error deleting user', err));
  };

  return (
    <div
    className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3 '>
    
    <Link className='btn btn-success' to='/create'>ADD</Link>

      <table className='table'>

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {
        user.map((u)=>(
          <tr key={u._id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.age}</td>
            <td><Link className='btn btn-success' to={`/update/${u._id}`}>Edit</Link> <button onClick={(e)=>handleDelete(u._id)} className='btn btn-success'>Delete</button></td>
          </tr>
        ))
      } 
      </tbody>
      </table>

    </div>

    </div>
  )
}

export default Users
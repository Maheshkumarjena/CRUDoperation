import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {

    const [user,setUser]=useState({
        name: '',
        email: '',
        age:''
    })
    const Navigate = useNavigate()



    const submit=(e)=>{
        e.preventDefault();
        // the post method takes two argument the first argunment location/api and the second argunment is the data that we want to pass 
        axios.post('http://localhost:3001/createUser',user)
        .then(result=>{console.log(result,'result logged ')
            Navigate('/')
        })
        .catch(error=>console.log(error))

    } 

  return (
<div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={submit}>
            <h2>Add User</h2>
            <div className='mb-2'>
                <label htmlFor=''>Name</label>
                <input type='text' placeholder='Enter Name' className='form-control'
                    onChange={(e)=>setUser({...user,name:e.target.value})}
                />
            </div>
            <div className='mb-2'>
                <label htmlFor=''>Email</label>
                <input type='email' placeholder='Enter Email' className='form-control'
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                />
            </div>
            <div className='mb-2'>
                <label htmlFor=''>Age</label>
                <input type='text' placeholder='Enter Age' className='form-control'
                    onChange={(e)=>setUser({...user,age:e.target.value})}
                />
            </div>
            <button className='btn btn-success'>Submit</button>
        </form>
    </div>
</div>

)
}

export default CreateUser
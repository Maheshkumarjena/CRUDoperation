import React from 'react'
import { useNavigate , useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {

    const{id}=useParams();
    
    const [user,setUser]=useState({
        name: '',
        email: '',
        age:''
    })
    const Navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:3001/getUser/'+id)
        .then(result => {console.log(result)
            setUser({name:result.data.name, email:result.data.email,age:result.data.age});
        })
        .catch(err=>console.log('error at UpudateUser',err))
    },[])

    const submit=(e)=>{
        e.preventDefault();
        axios.put('http://localhost:3001/updateUser/'+id, user)
        .then((result)=>{
            console.log(result);
            Navigate('/');
        })
        .catch(err=>console.log('error while updating data',err))
    }
    
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form>
            <h2>update User</h2>
            <div className='mb-2'>
                <label htmlFor=''>Name</label>
                <input type='text' placeholder='Enter Name' className='form-control'
                    value={user.name} onChange={(e)=>{setUser({...user,name:e.target.value})}}
                />
            </div>
            <div className='mb-2'>
                <label htmlFor=''>Email</label>
                <input type='email' placeholder='Enter Email' className='form-control'
                                        value={user.email}
                                        onChange={(e)=>{setUser({...user,email:e.target.value})}}

                />
            </div>
            <div className='mb-2'>
                <label htmlFor=''>Age</label>
                <input type='text' placeholder='Enter Age' className='form-control'
                                        value={user.age}
                                        onChange={(e)=>{setUser({...user,age:e.target.value})}}

                />
            </div>
            <button onClick={submit} className='btn btn-success'>Submit</button>
        </form>
    </div>
</div>

  )
}

export default UpdateUser
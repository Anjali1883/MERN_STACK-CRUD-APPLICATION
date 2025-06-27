import React, { useState } from 'react';
import "./addUser.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddUser = () => {

    const users= {
        name:"",
        email:"",
        address:"",
    }

    const [user, setUser]= useState(users);

    const navigate= useNavigate();

    const inputHandler=(e) =>{
        // e.target refers to element that triggered the event
        // name-> name attribute of input field     value-> current value eneterd by user
        const {name,value}= e.target;

        // update the user state with the new value of property specified by 'name'
        // spread operator copies current value of userState and update the specified property
        setUser({...user, [name]: value});

        // checking..,.
        // console.log(name, value)
    };

    const submitForm= async(e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/user", user)
        .then((response)=>{
            toast.success(response.data.mesage,{position:"top-right"})
            navigate("/")
        })
        .catch((error)=>{
            console.log(error)
        });
    }

  return (
    <div className= "addUser">
        <Link to= "/" type="button" className="btn btn-secondary">
            <i className="fa-solid fa-backward"></i> Back
        </Link>
        <h2>Add New User</h2>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='name' >Name:</label>
                <input
                    type= 'text'
                    id= 'name'
                    onChange={inputHandler}
                    name='name'
                    autoComplete='off'
                    placeholder='Enter Your Name'
                />
            </div>
            <div className='inputGroup'>
                <label htmlFor='email' >E-mail:</label>
                <input
                    type= 'email'
                    id= 'email'
                    onChange={inputHandler}
                    name='email'
                    autoComplete='off'
                    placeholder='Enter Your Email'
                />
            </div>
            <div className='inputGroup'>
                <label htmlFor='address' >Address:</label>
                <input
                    type= 'text'
                    id= 'address'
                    onChange={inputHandler}
                    name='address'
                    autoComplete='off'
                    placeholder='Enter Your Address'
                />
            </div>
            <div className='inputGroup'>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddUser
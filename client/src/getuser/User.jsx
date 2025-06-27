import React, { useEffect, useState } from 'react';
import "./user.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const User = () => {

    const [users, setUsers]= useState([]);

    // managing the side effect in the functional component 
    useEffect(()=>{
        const fetchData= async() =>{
            try {
                
                const response = await axios.get("http://localhost:8000/api/users");
                setUsers(response.data);

            } catch (error) {
                console.log("error whicle fetching data", error.message);
            }
        };
        fetchData();
    }, []);

    const deleteUser= async(userId)=>{
        await axios.delete(`http://localhost:8000/api/delete/user/${userId}`)
        .then ((response)=>{
            setUsers((prevUser)=>
                // if id matches, then DELETED otherwise not
               prevUser.filter((user)=>user._id !== userId)
            )
            toast.success(response.data.message,{position:'top-right'})
        })
        .catch((error)=>{
            console.log(error)
        })   
    }
  return (
    <div className='userTable'>
        <Link to ="/add" type="button" className="btn btn-primary">ADD USER <i className="fa-solid fa-user-plus"></i></Link>

    {users.length === 0?(
        <div className='noData'>
            <h2>No Data To Display.</h2>
            <p>Please add New User</p>
        </div>
    ):(<table className='table table-bordered'>
            <thead>
                <tr>
                    <th scope='col'>SNo.</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>                    
                    <th scope='col'>Address</th>                    
                    <th scope='col'>Action</th>                    
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                    return(
                     <tr key={user._id || index}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td className='actionBtn'>
                            <Link to={`/update/`+user._id} type="button" className="btn btn-info"><i className="fa-solid fa-pen-to-square"></i> </Link>
                            
                            <button
                            onClick={()=>deleteUser(user._id)}
                            type="button" className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                )
                })}
                
            </tbody>
    </table>)}
    </div>
  )
}

export default User;
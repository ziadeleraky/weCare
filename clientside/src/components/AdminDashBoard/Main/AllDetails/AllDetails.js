import React, { useEffect, useState } from "react";
import axios from "axios";
import img from '../../../../assets/images/user.jpg'

import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom"
export default function () {
  const {pathname} = useLocation();
  const urlType=pathname.split('/')[2]
console.log(urlType);
let {id}= useParams();
let [user,setUser]=useState({})

useEffect(()=>{
  console.log(id);
  axios.get(`http://localhost:7000/api/v1/${urlType}/${id}`, { 
    withCredentials: true, 
    headers: { 
      'Access-Control-Allow-Origin': 'http://localhost:3000', 
      'Content-Type': 'application/json' 
    } 
  })
  .then(res => { 
    setUser(res.data.data)
    console.log(res.data.data);
  })
  .catch(err => console.log(err))
},[])

  return (
    <>
      <div className="d-flex w-50 align-items-center m-auto p-3">
        <img src={`${user.profileImg?user.profileImg:img}`} className="w-25 rounded-circle"/>
        
        <h3 className="text-main ps-3 ">{user.firstName} {user.lastName}</h3>
      </div>
      <ul class="list-group text-start w-75 m-auto">
        <li class="list-group-item">
          <span className="text-main pe-2">ID: </span>{id}
        </li>
        <li class="list-group-item">
          <span className="text-main pe-2">Phone number: </span>{user.phoneNum}
        </li>
        <li class="list-group-item">
          <span className="text-main pe-2">Email: </span>{user.email}
        </li>
        <li class="list-group-item">
          <span className="text-main pe-2">Gender: </span>{user.gender}
        </li>
        <li class="list-group-item">
          <span className="text-main pe-2">Rating : </span>{user.ratings}
        </li>
        <li class="list-group-item">
          <span className="text-main pe-2">NationalID: </span>{user.nationalID}
        </li>
        <li class="list-group-item">
          <span className="text-main pe-2">Number of requests: </span>{user.requests?.length}
        </li>
      </ul>
    </>
  );
}

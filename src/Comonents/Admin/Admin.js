import React,{useState, useEffect, useContext} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {EthersContext} from '../../Context/EthersContext'
import Loader from '../Loading/Loading'
import './Admin.css'
function Admin() {
const navigate  = useNavigate()
const [isLoading, setisLoading] = useState(false)
const { checkOwner, changeOwner, changeLimit,limitCount,withdrawUsdt} = useContext(EthersContext)
const [Address, setAddress] = useState()
const [Limit, setLimit] = useState()
const [Limit2, setLimit2] = useState()
const initiator = async()=>{
    setisLoading(true)
    try{
     const v = await checkOwner()
     const l1  = await limitCount()
     setLimit2(l1)
     if(v!=true) {
         alert("Not Authorized")
         navigate('/')
     }
    }catch(e){
        console.log(e)
        alert(e)
    }
    setisLoading(false)
}

const changeOwner1=async()=>{
   setisLoading(true)
   if(Limit==null) return alert("fill in something")
   await changeOwner(Address)
   setisLoading(false)
   initiator()
}

const changeLimit1=async()=>{
    setisLoading(true)
    if(Address==null) return alert("fill in something")
     await changeLimit(Limit)
    setisLoading(false)
    initiator()
 }

 const withDr = async()=>{
    var answer = window.confirm("Save data?");
    if (answer) {
        setisLoading(true)
        await withdrawUsdt()
        setisLoading(false)
    }
    else {
        alert("withdrawal cancelled")
    }

 }

useEffect(() => {
    initiator()
}, [])

  return isLoading? <Loader/>:
  <div>
      <div className='h_head'> Admin Panel</div>
      <div className='h_box  text-white'>
          <div> Total number of tokens Supplied:</div>
          <div className='text-green-400'>{Limit2}</div>
          <div>Transfer ownership</div>
          <input placeholder="new Address" className='text-black' onChange={(e)=>{setAddress(e.target.value)}}></input>
          <button class="button-8" role="button" onClick={changeOwner1}>Change Owner</button>
          <div>Change Unit max limit</div>
          <input placeholder="new Limit" className='text-black' onChange={(e)=>{setLimit(e.target.value)}}></input>
          <button class="button-8" role="button" onClick={changeLimit1}>Change Limit</button>

          <button class="button-8" role="button" onClick={withDr}>WithDraw Balance USDT</button>
      </div>
  </div>
}

export default Admin
import React, { useState, useEffect, useContext } from 'react'
import './Landing.css'
import { useNavigate } from 'react-router-dom'
import { EthersContext } from '../../Context/EthersContext'

function Landing() {
  const navigate = useNavigate()
  const {connectWallet,currentAccount,Language} = useContext(EthersContext)
  const checker = async () => {
    if(currentAccount!=null){
      console.log("navigating from lading page")
     navigate("/")
    }
  }
  useEffect(() => {
   checker()
  }, [currentAccount])
  return (
    <div className='text-white landing_main'>
      <div className='l_welcome'>{Language[28]},</div>
      
      <div className='l_bottom'>
        <div className='connect_btn' onClick={async ()=>{
        await connectWallet()
        navigate('/')
        }}>{Language[29]}</div>
      </div>
    </div>
  )
}

export default Landing
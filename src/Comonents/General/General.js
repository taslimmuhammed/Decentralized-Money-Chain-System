import React,{useState, useEffect, useContext} from 'react'
import './General.css'
import {EthersContext} from '../../Context/EthersContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loading/Loading'
function General() {
  const navigate = useNavigate()
  const {checkSignIn,unitBalance,buyToken,enterGame,unitCount, currentAccount,Language} = useContext(EthersContext)
  const [Units, setUnits] = useState(0)
  const [BUnits, setBUnits] = useState(0)
  const [In, setIn] = useState(0)
  const [isLoading, setisLoading] = useState(false)
  const handleBuy= async()=>{
    setisLoading(true)
    if(Units==1) return alert(Language[17])
   try{
      await buyToken("1")
      alert(Language[18])
      initiaor()
   } catch(e){
   console.log(e.data.message)
   alert(Language[19])
   }
   setisLoading(false)
}

const handleLot= async()=>{
  setisLoading(true)
 try{
    await enterGame()
    alert(Language[20])
    initiaor()
 } catch(e){
 console.log(e)
 alert(e.data.message)
 }
 setisLoading(false)
}


const initiaor= async()=>{
  setisLoading(true)
  try{
    
    const s1 = await checkSignIn()
    if(s1!=1) navigate("/")
    const units = await unitBalance()
    setUnits(units[0])
    setBUnits(units[1])
    setIn(units[3])
  }catch(e){
      console.log(e)
  }
  setisLoading(false)
}

useEffect(() => {
  initiaor()
}, [])
  return (
  isLoading?<Loader/>:<div className='p_main'>
  <div className='p_head'>{Language[21]}</div>
  <div className='Wallet'>
      <div className='wallet_head'>{Language[22]}</div>
      <div className='wallet_address'>{currentAccount}</div>
  </div>

  <div className='p_bottom'>

      <div className='sub_head'>{Language[23]}</div>
      <div className='sub_sub'>{Units}/1</div>
    
      <div className='sub_head'>{Language[24]}</div>
      <div className='sub_sub'>{BUnits}/{In}</div>

      <div className='sub_head'>{Language[25]}</div>
          <div className='sub_sub'>10 USDt (*polygon chain)</div>
      <div className='p_buttons' >
          <button className="button-9" role="button" onClick={handleBuy}>{Language[26]}</button>
          <button className="button-9" role="button" onClick={handleLot}>{Language[27]}</button>
          </div>
     
  </div>

</div>
  )
    
}

export default General
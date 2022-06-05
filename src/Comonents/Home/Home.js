import React,{useState, useEffect, useContext} from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import {EthersContext} from '../../Context/EthersContext'
import Loader from '../Loading/Loading'
function Home() {

  const [Selected, setSelected] = useState(true)
  const [refferalId, setrefferalId] = useState()
  const [isLoading, setisLoading] = useState(false)
  const [x, setx] = useState()
  const navigate = useNavigate()
  const {signIn} = useContext(EthersContext)
  const handleSubmit= async()=>{
    setisLoading(true)
    try{
      let refferal ;
      if(refferalId==null)  refferal= "0x0000000000000000000000000000000000000000"
      else refferal = refferalId
     await signIn(refferal, x)
    console.log(x)
    window.location.reload();
    }catch(e){
      console.log(e)
    }
  setisLoading(false)
  }
  return (
    <div>
      {
        isLoading?  <Loader/>:
          Selected?      <div>
          <div className='h_head'>Select Mode</div>
          <div className='h_box'>
            <div className='h_btn' onClick={()=>{
              setx(true)
              setSelected(false)
            }}>Active Member</div>
  
            <div className='h_btn' onClick={()=>{
              setx(false)
              setSelected(false)
            }}>Passive Member</div>
          </div>
        </div>:
        <div>
        <div className='h_head'>Enter Refferal</div>
         <div className='h_head'>(*optional)</div>
         
        <div className='h_box'>
          <input className='h_btn bg-transparent px-1'
           placeholder='referal Id' 
           onChange={(e)=>{
             setrefferalId(e.target.value)
           }}></input>
          <div className='h_btn' onClick={handleSubmit}>Sign In</div>
        </div>
      </div>
        
      }
     
</div>
  )
}

export default Home
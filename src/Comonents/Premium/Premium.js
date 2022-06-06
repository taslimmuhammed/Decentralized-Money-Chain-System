import React,{useState, useEffect, useContext} from 'react'
import './Premium.css'
import Loader from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import {EthersContext} from '../../Context/EthersContext'
import Modal from 'react-modal'
Modal.setAppElement("#root");
function Premium() {
    let y=0;
    const navigate = useNavigate()
    const {checkSignIn,unitBalance,buyToken,enterGame,unitCount, currentAccount,getReferanceProfit} = useContext(EthersContext)
    const [Units, setUnits] = useState(0)
    const [BUnits, setBUnits] = useState(0)
    const [Bunit1, setBunit1] = useState(0)
    const [ReferalBalance, setReferalBalance] = useState(0);
    const [isLoading, setisLoading] = useState(false)
    const initiaor= async()=>{
        setisLoading(true)
        try{
            const s1 = await checkSignIn()
            if(s1!=2) navigate("/")
            const units = await unitBalance()
            setUnits(units)
            let  refer = await getReferanceProfit()
            refer = refer/1000000
            refer = refer.toFixed(2);
            setReferalBalance(refer)
            const bunits = await unitCount()
            let balance = bunits- units/100
           if(balance<0) balance = 0;
            balance = balance.toFixed(2);
            setBUnits(balance)
            setBunit1(bunits)
        }catch(e){
            console.log(e)
        }
        setisLoading(false)
    }

    const handleBuy= async()=>{
      setisLoading(true)
      if(Bunit1==90) return alert('Your limit has been reached')
     try{
        await buyToken()
        alert(" Succefully bought 1 UNIT")
        initiaor()
     } catch(e){
     console.log(e)
      alert("Make sure you have 10 usdt in polygon blocchain, Note: if you have USDt in other blockchains please swap to polygon")
     }
     setisLoading(false)
  }

  const handleLot= async()=>{
    setisLoading(true)
   try{
      await enterGame()
      alert(" 1 UNIT has been used Lot, if you win your unit balance will increase automatically")
      initiaor()
   } catch(e){
   console.log(e)
   alert(e)
   }
   setisLoading(false)
}

    useEffect(() => {
      initiaor()
    }, [y])


 const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
    
  return isLoading? <Loader/>:
    <div className='p_main'>
        <div className='p_head'>Premium Member</div>
        <div className='Wallet'>
            <div className='wallet_head'>WALLET ADDRESS</div>
            <div className='wallet_address'>{currentAccount}</div>
        </div>

        <div className='p_bottom'>
          <div className='p_details'>
              <div>
              <div className='sub_head'>Buy Unit</div>
            <div className='sub_sub'> {Units/100}/90</div>
              </div>
            
             <div>
             <div className='sub_head'>Out Unit</div>
            <div className='sub_sub'>{BUnits}/{Bunit1}</div>
             </div>
            
            </div>
            <div className='sub_head'>Price of Unit</div>
            <div className='sub_sub'>10 USDt (*polygon chain)</div>

            <div className='sub_head'>Reference Profit</div>
            <div className='sub_sub'>{ReferalBalance}/USDT</div>
              
            <div className='p_buttons' >
            <button className="button-9" role="button" onClick={handleBuy}>Purchase</button>
            <button className="button-9" role="button" onClick={handleLot}>Start</button>
            </div>
            <div className='p_rec'>Recommend Members</div>

            <div className='p_cards'>
                <div className='p_card'>
                    <div className='p_card_head'>Level 1</div>
                    <div className='p_card_sub'>xxx</div>

                    <div className='p_card_head'>Level 2</div>
                    <div className='p_card_sub'>xxx</div>

                    <div className='p_card_head'>Level 3</div>
                    <div className='p_card_sub'>xxx</div>
                </div>

                <div className='p_card'>
                    <div className='p_card_head'>Level 4</div>
                    <div className='p_card_sub'>xxx</div>

                    <div className='p_card_head'>Level 5</div>
                    <div className='p_card_sub'>xxx</div>

                    <div className='p_card_head'>Level 6</div>
                    <div className='p_card_sub'>xxx</div>
                </div>

                <div className='p_card'>
                    <div className='p_card_head'>Level 7</div>
                    <div className='p_card_sub'>xxx</div>

                    <div className='p_card_head'>Level 8</div>
                    <div className='p_card_sub'>xxx</div>

                    <div className='p_card_head'>Level 9</div>
                    <div className='p_card_sub'>xxx</div>
                </div>
            </div>
          
        </div>

        {/* <div className='reffer_card'> */}
            <button className='reffer_btn' onClick={toggleModal}>Get refferal Id</button>

<Modal
  isOpen={isOpen}
  onRequestClose={toggleModal}
  contentLabel="My dialog"
  className="mymodal"
  overlayClassName="myoverlay"
  closeTimeoutMS={500}
>
  <div className='md_1'>Share the same website link to your friends and enter the followong referal Id to earn refferal bonus.</div>
  <div className='md_2'>Your referal Id: {currentAccount}</div>
  <button onClick={toggleModal} className="md_3">Close modal</button>
</Modal>
        {/* </div> */}
    </div>
  
}

export default Premium
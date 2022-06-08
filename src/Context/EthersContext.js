import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
import { abi } from "../Utils/abi";
import { usdtAbi } from "../Utils/USDtabi";

export const EthersContext = createContext(null);
const {ethereum} = window
export default function Ethers({children}){

  const contractAddress = "0xf52aCe1D0382314E75b7761312808Fc3152f81f0"
  const usdtContractAddress  =  "0x493e6ad3b3e782db7e056d39253bae2f92bb96b6"
    const [currentAccount, setCurrentAccount] = useState(null);
    const [N, setN] = useState();

    const checkIfWalletIsConnect = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length) {
          setCurrentAccount(accounts[0]); 
          return 1;
        } else {
          alert("No accounts found");
          return 0;
        }
      } catch (error) {
        console.log(error);
        return 0;
      }
    };

    const connectWallet = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        setCurrentAccount(accounts[0]);
        window.location.reload();
      } catch (error) {
        console.log(error);
        throw new Error("No ethereum object");   
      }
    };

  
  
      const checkOwner = async()=>{
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const accounts = await ethereum.request({method:"eth_accounts"})
        const account  = accounts[0]
         const contract = new ethers.Contract(contractAddress, abi,signer)

         const ownerAddress = await contract.owner()
         let x= false;
         if(account.toUpperCase()===ownerAddress.toUpperCase()) x=true
         return x
      }

      const checkSignIn = async()=>{
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi,signer)
        const accounts = await ethereum.request({method: "eth_accounts"})
        const account  = accounts[0]
         const s1 = await contract.active(account)
         const s2 =  parseInt(s1, 16)
         return s2;
      }


      const signIn= async(address, active)=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const transfer = await contract.signIn(address, active)
          await transfer.wait()
        }catch(e){
      alert(e)
        }
      }

      const getUsdtBalance= async(address, active)=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(usdtContractAddress ,usdtAbi ,signer)
          const balance = await contract.getUsdtBalance()
          return balance
        }catch(e){
          console.log(e)
        }
      }
      const getReferanceProfit= async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const balance = await contract.referenceProfit(account)
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const withdrawBalanceUsdt = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(usdtContractAddress ,usdtAbi ,signer)
          const balance = await contract.withdrawBalanceUsdt()
          return balance
        }catch(e){
          console.log(e)
        }
      }
      const unitBalance = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          let balance = await contract.unitBalance(account)
          let s2 =  parseInt(balance._hex, 16)
          let arr = [s2];
          let balance1 = await contract.unitCount(account)
          let s21 =  parseInt(balance1._hex, 16)
          arr.push(s21)
          const balance2 = await contract.benifit(account)
          const s22 =  parseInt(balance2._hex, 16)
          arr.push(s22)
          console.log(arr)
          const balance3 = await contract.referenceProfit(account)
          const s23 =  parseInt(balance3._hex, 16)
          arr.push(s23)
        return arr
        }catch(e){
          console.log(e)
        }
      }
      const rBenifit = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const balance = await contract.benifit(account)
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const unitCount = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const balance = await contract.unitCount(account)
          const s2 =  parseInt(balance._hex, 16)
          console.log("unitcounr",s2)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const limitCount = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()  
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const balance = await contract.unitLimit()
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }




      const sendUSDTtoContract= async(amount)=>{
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(usdtContractAddress ,usdtAbi ,signer)
        let _amount = parseInt(amount)
        _amount = _amount * 10000000
        _amount = _amount+""
        const transfer = await contract.transfer(contractAddress,_amount)
        await transfer.wait()
        return transfer
      }

      const buyToken= async(amount)=>{
          const transaction = await sendUSDTtoContract(amount)
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress ,abi,signer)
          console.log("Sending.....")
          const transfer = await contract.buyUnitToken(amount)
          await transfer.wait()
          console.log("transferred")
          console.log(amount)
      }
     


      
      const enterGame= async()=>{
        
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi,signer)
          let x = Math.floor(Math.random() * 10);
          console.log(x)
          const gameEntry = await contract.enterGame(x)
          await gameEntry.wait()

      }
      const changeOwner= async(address)=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi,signer)
          await contract.changeOwner(address)
        }catch(e){
          console.log(e)
          alert(e)
        }
      }
      const changeLimit= async(limit)=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi,signer)
          const chlmt = await contract.changeLimit(limit)
          await chlmt.wait()
          alert("Limit changed succefully")
        }catch(e){
          console.log(e)
          alert(e)
        }
      }
      // const changeNetwork = async () => {
      //   if (window.ethereum) {
      //     try {
      //       await window.ethereum.request({
      //       method: 'wallet_switchEthereumChain',
      //         params: [{ chainId: "0x89" }],
      //       });
      //     } catch (error) {
      //       console.error(error);  myRefferals
      //     }
      //   }}
      const referanceData = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          
          const referals = await contract.myRefferals(account)
          let arr=[];
          for(let i=0; i<9;i++){
            const s1 = await referals[i]._hex
            const s2 =  parseInt(s1, 16)
            arr.push(s2)
          }
          return arr
        }catch(e){
          console.log(e)
        }
      }
      

      const getN = async()=>{
        const chainId = 137 // Polygon Mainnet

        if (window.ethereum.networkVersion !== chainId) {
              try {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: "0x89" }]
                });
              } catch (err) {
                  // This error code indicates that the chain has not been added to MetaMask
                if (err.code === 4902) {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainName: 'Polygon Mainnet',
                        chainId: "0x89" ,
                        nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                        rpcUrls: ['https://polygon-rpc.com/']
                      }
                    ]
                  });
                }
              }
            }
        
      }

    useEffect(() => {
      checkIfWalletIsConnect();
      // changeNetwork()
      // getN()
    }, []);


    return(
        <EthersContext.Provider value={{connectWallet,unitCount,referanceData,getReferanceProfit, currentAccount,changeLimit,limitCount, checkIfWalletIsConnect , checkOwner,checkSignIn, signIn,getUsdtBalance,withdrawBalanceUsdt,unitBalance, sendUSDTtoContract,buyToken,enterGame,changeOwner,rBenifit}}>
          {children}
        </EthersContext.Provider>
    )
}


// chnageOwner(address _newOwner)
// signIn(address _friend,bool _active) 
// enterGame(uint256 x)
// buyUnitToken()
// getUsdtBalance()
// withdrawBalanceUsdt()
// unitBalance(address)
// usdtBalance(address)
// active(address)
// 
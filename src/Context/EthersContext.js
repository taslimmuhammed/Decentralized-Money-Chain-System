import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
import { abi } from "../Utils/abi";
import { usdtAbi } from "../Utils/USDtabi";

export const EthersContext = createContext(null);
const {ethereum} = window
export default function Ethers({children}){

  const contractAddress = "0x758782bf476b8ca4985eda23527b0f2ea94dbd61"
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
          alert(e)
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
          alert(e)
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
          alert(e)
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
          const balance = await contract.unitBalance(account)
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
          alert(e)
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
          alert(e)
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
          alert(e)
        }
      }




      const sendUSDTtoContract= async()=>{
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(usdtContractAddress ,usdtAbi ,signer)
        const transfer = await contract.transfer(contractAddress,"10000000" )
        await transfer.wait()
        return transfer
      }

      const buyToken= async()=>{
          const transaction = await sendUSDTtoContract()
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress ,abi,signer)
          console.log("Sending.....")
          const transfer = await contract.buyUnitToken()
          await transfer.wait()
          console.log("transferred")
      }
     


      
      const enterGame= async()=>{
        
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi,signer)
          let x = Math.random();
          x =( x- x%.1)*10
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
          const gameEntry = await contract.changeLimit(limit)
          alert("ownership transfered succefully")
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
      //       console.error(error);
      //     }
      //   }}

      

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
        <EthersContext.Provider value={{connectWallet,unitCount,getReferanceProfit, currentAccount,changeLimit,limitCount, checkIfWalletIsConnect , checkOwner,checkSignIn, signIn,getUsdtBalance,withdrawBalanceUsdt,unitBalance, sendUSDTtoContract,buyToken,enterGame,changeOwner}}>
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
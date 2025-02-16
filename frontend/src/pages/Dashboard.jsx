import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from './Users'
import axios from 'axios'

const Dashboard = () => {

  const [balance ,setBalance] =useState(null)

  useEffect(()=>{
    const fetchBalance =async()=>{
        try{
          const token =localStorage.getItem("token")
          if(!token){
            console.log("no token found")
          }
            const response =await axios.get("https://payment-app-3ogv.onrender.com/api/v1/account/balance",{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
            setBalance(response.data.balance)
          
        }
        catch(error){
          console.log("didnt get the balnce",error)
        }
    }
    fetchBalance()
  },[])
  return (
    <div className='p-6 bg-white min-h-screen'>
        <Appbar/>
        <div className='mt-8 '>
            <Balance value={balance !==null? balance:"loading..."}/>
            <Users/>
        </div>
    </div>
  )
}

export default Dashboard
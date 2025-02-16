import React, { useState } from 'react'
import Heading from '../components/Heading'
import Subheading from '../components/Subheading'
import Input from '../components/Input'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
// import Dashboard from './Dashboard'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate =useNavigate()
  const [emailOrPassword , setEmailOrPassword] =useState("");
  const [password , setPassword] =useState("");
  const [errorMessage, setErrorMessage] =useState("") // to store the error msg


  const handleSign =async()=>{
   
    // const signupToken  =localStorage.getItem("token")
    // console.log(signupToken)
    // console.log("Stored Signup Token:", localStorage.getItem("token"));


    // if(!signupToken){
    //   setErrorMessage("please signup first");
    //   return 
    // }

    try{
      // sending the backend request
      const response =await axios.post("http://localhost:3000/api/v1/signin",{
        identifier:emailOrPassword,
        password
      })
      const {token} =response.data
      console.log("signin token",token)
      localStorage.setItem("token",token)
      navigate('/Dashboard')

      console.log("signin successfull", token)
      
    }
    
    catch(error){
      if(error.response){
        setErrorMessage(error.response.data.message || "something went wrong")
      }else{
        setErrorMessage("unable to connect to the server")

      }
      console.log("signin error", error)
      
    }
  }
  return (
    <div className=' flex justify-center h-screen min-h-screen '>
        <div className='flex flex-col justify-center'>
          <div className='w-80 bg-white items-center text-center rounded shadow-2xl p-2'>
            <Heading label={"signin"}/>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Subheading label={"enter your information to sigin to your account"}/>
            <Input 
            value={emailOrPassword}
            onChange={(e)=>setEmailOrPassword(e.target.value)}
            label={"username"}
            placeholder={"eneter your username or email"}/>

            <Input
            value={password}
            onChange={(e=>setPassword(e.target.value))}
            label={"password"}
            placeholder={"eneter your password"}/>
            <Button onClick={handleSign}
            label={"signin"}/>
            <BottomWarning label={"Don't have an account"} buttonText={"signup"} to='/signup'/>
            


          </div>
        

        </div>
    </div>
  )
}

export default Signin
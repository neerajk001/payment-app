import React, { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Subheading from '../components/Subheading'
import Input from '../components/Input'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



function Signup() {
    const navigate =useNavigate()

    
    const [firstName, setFirstName]  =useState("");
    const [lastName, setLastName] =useState("");
    const [username, setUsername] =useState("");
    const [email ,setEmail] =useState("");
    const [password,setPassword] =useState("")
    useEffect(()=>{
        console.log(firstName)
    },[firstName])
  return (
    <div className=' flex justify-center h-screen min-h-screen '>
        <div className='flex flex-col justify-center '>
            <div className='bg-white rounded-lg p-1 px-8 h-max w-90 text-center  '>
                <Heading label="signup"/>
                <Subheading label="Enter your information to create your account"/>
                <Input 
                value={firstName}
                onChange={(e)=>{setFirstName(e.target.value) }}
                label="firstName" 
                placeholder="enter your first name"/>

                <Input 
                value={lastName}
                onChange={(e)=>{setLastName(e.target.value)}}
                label="lastName"
                 placeholder="enter your last name"/>

                <Input 
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                label="username" 
                placeholder="enter your username"/>

                <Input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                label="email"
                 placeholder="enter your username"/>

                <Input 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                label="password" 
                placeholder="enter your new password"/>,
                {/* console.log("before button") */}
                <Button 
                 onClick={async () => {
                    console.log("Signup button clicked!"); // Debug log
                        try {
                     console.log("Sending request to backend..."); 
      
                const response = await axios.post("http://localhost:3000/api/v1/signup", {
                firstName,
                lastName,
                username,
                 email,
                 password
                    });

                    console.log("Response received:", response.data); 
                    localStorage.setItem("token", response.data.token);
                    navigate ('/signin')
                } catch (error) {
                console.error("Error:", error.response ? error.response.data : error.message);
                }
                    }}
                label="Signup"
                
                />


                <BottomWarning label="already have an account?" buttonText="signin" to="/signin" />


            </div>

        </div>
       
    </div>
  )
}

export default Signup
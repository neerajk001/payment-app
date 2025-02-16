import express from "express";
import mongoose from "mongoose";
import account from "../model/account.js";



export const AccountBalance =async(req,res)=>{
    console.log(req.body)
    const userAccount =await account.findOne({
        userId: req.userId
        
    })
    res.json({
        balance:userAccount.balance
    })
}


export const transferBalance =async (req,res) =>{
    const session  =await mongoose.startSession();

     session.startTransaction()
     const {amount , to} =req.body;

     // fetch the account within the transaction 
     const userAccount  =await account.findOne({userId:req.userId}).session(session)
   console.log("useraccount",userAccount)
    if(!userAccount || userAccount.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"insufficient account balance"
        })
    }

    const toAccount = await account.findOne({userId:to}).session(session);
    
    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Invalid account"
        })
    }

    // perform the transfer 
    await account.updateOne({userId:req.userId}, {$inc:{balance:-amount}}).session(session)
    await account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)

    // commit the transaction
    await session.commitTransaction()
    res.json({
        message:'transfer successful'
    })

     
}
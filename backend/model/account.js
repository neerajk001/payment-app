import mongoose from "mongoose";
import { Schema } from "mongoose";
// import { number, Schema } from "zod";
import userModel from "./user.model.js";

const accountSchema =new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, // reference to the user model
        ref:'User', 
        required:true
    },
    balance:{
        type:Number, 
        required:true


    }
})

const account = mongoose.model("Account", accountSchema)
export default account
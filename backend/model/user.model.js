import mongoose from "mongoose"
import { Schema } from "mongoose"

const userSchema =new Schema({

    email: { type: String, 
        required: true,
         unique: true },
  
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:30
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:30
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:30
    },
     password:{
        type:String,
        required:true,

     },
    

})


const userModel = mongoose.model('User', userSchema);
export default userModel;
import JWT_SECRET from "./config.js";
import jwt, { decode } from 'jsonwebtoken'


const authMiddleware =async(req ,res , next) =>{
    const authHeader =req.headers.authorization;
    console.log("account routes reaching here")

    if( !authHeader || !authHeader.startsWith('Bearer')){
        res.json({
            message:"auth header error"
        })
    }

    const token = authHeader.split(" ") [1];
    try{
        const decoded =jwt.verify(token , JWT_SECRET)
        console.log("decoded",decoded)
        console.log("reqbody",req.body)
        console.log("decodedUser",decoded.userId)
        if(decoded.id){
            req.userId =decoded.id
            next();
        }else{
            res.json({
                message:"error in decoding"
            })
        }


            
        
    }
    catch(error){
        res.status(400).json({
            message :"error in middleware"
        })
    }
}

export default authMiddleware;
import express from "express";
import zod from 'zod'
import userModel from "../model/user.model.js";
import jwt from 'jsonwebtoken'
import JWT_SECRET from "../config.js";
// import authMiddleware from "../middleware.js";
import account from "../model/account.js";
// import {objectid}


const signupSchema = zod.object({
    email: zod.string().email(), 
    username: zod.string(),  // Fixed: Added () after email
    password: zod.string().min(5, "min five 5 characters required"),
    firstName: zod.string(),
    lastName: zod.string()
})

export const signup = async (req, res) => {
    try {
        const validationResult = signupSchema.safeParse(req.body); // Use safeParse instead of parse
        if (!validationResult.success) {
            return res.status(411).json({
                success: false,
                message: "Incorrect inputs",
                errors: validationResult.error.issues
            });
        }

        const existingUser = await userModel.findOne({
            username: req.body.username
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const dbUser = await userModel.create(req.body); 
        const userId =dbUser._id;
        await account.create({
            userId,
            balance:1+Math.random()*10000
        })

        // res.json({
        //     success:true,
        //     balance:balance
        // })
        const token = jwt.sign({
            id: dbUser._id  
        }, JWT_SECRET,
        
    );

        res.json({
            token: token,
            message: "User created successfully",
            id: dbUser._id
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const signinSchema = zod.object({
  identifier: zod.string().min(3, "Email or username is required"),
  password: zod.string().min(1, "Password is required"),
});

export const signin = async (req, res) => {
  try {
    const validSign = signinSchema.safeParse(req.body);
    if (!validSign.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid inputs",
      });
    }

    const { identifier, password } = req.body;

    const user = await userModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // In production, you'd use bcrypt.compare here
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "7d" } // optional but good practice
    );

    return res.status(200).json({
      success: true,
      message: "Signin successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

 const  updateSchema=zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

export const updateBody = async(req,res) =>{
   try{
    const {success} =updateSchema.safeParse(req.body)
    if(!success){
        return res.status(400).json({
            message:"invalid credential"
        })
    }
        console.log("success",success)
    const result =await userModel.updateOne(
        {_id:req.userId},
        {$set:req.body}
    )

    // res.json({
    //    result:result
    // })
    if(result.modifiedCount ===0){
        return res.status(400).json({
            message:"No changes has been made in the document"
        })
    }

    res.json({
        success:true,
        message:"user update successfull"
    })
   }catch(error){
    console.error("Error updating user",error)
    res.status(500).json({
        message:"internal server error"
    })
   }

}

export const getBulk =async(req,res)=>{
    const filter  =req.query.filter || "";
    const users = await userModel.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            _id:user._id
        }))
    })


}


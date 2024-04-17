import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup =  async(req,res)=>{
    try {
        const {email,username,password,confirmPassword,gender} = req.body

        if(!email || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({message:"Please enter valid details"})
        }
       

        

        if(password !==confirmPassword){
            return res.status(400).json({message:"Password doesn't match"})
        }

        const user = await User.findOne({email:email})
        if(user){
            return res.status(400).json({message:'User already exist'})
        }

        const salt = await bcrypt.genSalt(10)
        
        const hashPassword = await bcrypt.hash(password,salt)
        


        const boyPic =  `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlPic =  `https://avatar.iran.liara.run/public/girl?username=${username}`  


        const newUser = new User({
            email,
            username,
            password:hashPassword,
            gender,
            profilePic : gender === "male" ?boyPic : girlPic 
        })

      await newUser.save()
      res.status(200).json({success:true,message:"User sucessfully created"})

    }



 catch (error) {

        console.log(error.message);
        res.status(500).json({error:"Internal server Error"})


        
    }
}

export const login = async(req,res)=>{
    try {

        const{email,password} = req.body

        if(!email,!password){
            return res.status(400).json({message:"Please enter the email & password"})

        }

        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isPasswordCorrect = await bcrypt.compare(password,user?.password)

        if(!isPasswordCorrect){
            return res.status(400).json({status:false,message:"Password mismatch"});
        }

       

       const token =  generateTokenAndSetCookie(user._id,res)

       const userid = user._id
       const image = user.profilePic
       const username = user.username
       
        res.status(200).json({
           success:true,message:'Successfully login',token,userid,image,username
        })

        
    } catch (error) {

        console.log(error.message);
        res.status(500).json({error:"Internal server Error"})

        
    }
}


export const logout = (req,res)=>{
   try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out sucessfully"});
   } catch (error) {
    console.log("Error in logout",error.message);
    res.status(500).json({error:"Internal server Error"})
   }
}
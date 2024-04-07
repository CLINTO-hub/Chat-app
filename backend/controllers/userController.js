import User from "../models/userModel.js";

export const getUsersForSidebar = async(req,res)=>{
    try {
        const loggedInuser = req.user._id
        const allUsers = await User.find({_id:{$ne:loggedInuser}}).select('-password') 
        res.status(200).json(allUsers)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"Internal server error"})
    }
}
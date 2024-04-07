import Conversation from "../models/conversationModel.js";
import Message from '../models/messageModel.js'

export const sendmessage = async (req,res)=>{
    try {
        const{message} = req.body;
        const {id:receiverId} = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        console.log(conversation);

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

       await Promise.all([conversation.save(), newMessage.save( )])

        if(!newMessage){
            conversation.messages.push(newMessage._id)
        }
        if(newMessage){
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }
        res.status(201).json(newMessage)

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"Internal server error"})
        
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userTochatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userTochatId]},
        }).populate("messages")

        console.log('conversation',conversation);

        if(!conversation) return res.status(200).json([])
        

        const messages = conversation.messages;
        res.status(200).json(messages)



    } catch (error) {
        console.log("Error in getmessages",error.message);
        res.status(500).json({error:"internal server error"})
        
    }
}
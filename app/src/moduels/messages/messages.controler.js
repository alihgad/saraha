import Message from "../../../DB/models/message.model.js";
import User from "../../../DB/models/user.model.js";
import errorHandler from "../../utils/errorHandler.js";
import { ErrorStatus } from "../../utils/errorStatus.js";

export const getMessages = errorHandler(async (req,res,next)=>{
    let messages = await Message.find({receiverId:req.user._id})
    return res.status(200).json({msg:'done',messages})
})


export const sendMessage = errorHandler(async (req,res,next)=>{
    let {email , content} = req.body
    let user = await User.findOne({email})
    if(!user) return next(new ErrorStatus('email not found',404))
    let data = await Message.create({receiverId:user._id , content})
    return res.status(200).json({msg:'done',data})
})

export const deleteMessage  = errorHandler(async (req,res,next)=>{
    let id = req.params.id
    if(!id) return next(new ErrorStatus('id not provided',500))
    let message = await Message.findById({_id:id})
    if(!message) return next(new ErrorStatus('message not founded',404))
    if(message.receiverId!=req.user._id) return next(new ErrorStatus('Unauthorized',401))
    let data = await Message.findOneAndDelete({_id:id})
    return res.status(200).json({msg:'done' , data})
})
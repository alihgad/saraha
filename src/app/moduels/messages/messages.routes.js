import { Router } from "express";
import { deleteMessage, getMessages, sendMessage } from "./messages.controler.js";
import validators from "./middelware/validator.js";
import token from "../middelware/token.js";


let messageRouter = Router()

messageRouter.get('/',token,getMessages)
messageRouter.post('/',token,validators,sendMessage)
messageRouter.delete('/:id',token,deleteMessage)






export default messageRouter
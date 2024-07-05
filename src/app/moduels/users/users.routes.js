import { Router } from "express";
import { addUsers, deleteUser, getUser, getUsers, logIn, updatePassword, updateUser, verifyEmail } from "./users.controler.js";
import uniuqeEmail from "./middelware/uniuqeEmail.js";
import validation from "./middelware/validator.js";
import token from "../middelware/token.js";

let userRouter = Router()

userRouter.get('/',getUsers)
userRouter.post('/',validation,uniuqeEmail,addUsers)
userRouter.post('/login',logIn)
userRouter.post('/verfiy',token,verifyEmail)
userRouter.get('/profile',token,getUser)
userRouter.delete('/',token,deleteUser)
userRouter.put('/',token,updateUser)
userRouter.patch('/',token,updatePassword)





export default userRouter
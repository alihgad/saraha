import errorHandler from './../../utils/errorHandler.js'
import User from '../../DB/models/user.model.js'
import bcrypt from 'bcrypt'
import main from '../../services/sendEmail.js'
import { ErrorStatus } from '../../utils/errorStatus.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const getUsers = errorHandler(async (req, res, next) => {
        
        const users = await User.find()
        return res.status(200).json({ users })
})

export const getUser = errorHandler(async (req, res, next) => {
        return res.status(200).json({msg:'done' , user : req.user })
})

export const addUsers = errorHandler(async (req, res, next) => {
        let { name, email, password } = req.body
        let OTP = Math.ceil(Math.random() * (9999 - 1000) + 1000)
        let data = await main(email, OTP, name)
        console.log(data);
        let hashedPassword = await bcrypt.hash(password, 8)
        const newUser = await User.create({name , email , password:hashedPassword , otp : OTP})
        let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        return res.status(200).json({
                name : newUser.name,
                email : newUser.email,
                _id : newUser._id,
                token 
        })
})

export const logIn = errorHandler(async (req, res, next) => {
        let { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
                next(new ErrorStatus('wrong data' , 500))
        }
        let hashedPassword = bcrypt.compareSync(password, user.password)
        if (!hashedPassword) {
                next(new ErrorStatus('wrong data' , 500))
        }
        if(!user.verifyed){
                next(new ErrorStatus('Email not verified' , 401))
        }
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        return res.status(200).json({ msg: 'done', token })
})


export const verifyEmail = errorHandler(async (req, res, next) => {
        let { otp } = req.body
        let user = req.user
        if (!user) {
                next(new ErrorStatus('wrong data' , 500))
        }
        if (user.otp!== otp) {
                next(new ErrorStatus('wrong OTP' , 401))
        }
        let last = await User.findOneAndUpdate({_id: user._id},{verifyed:true},{new:true})
        return res.status(200).json({ msg: 'done'  ,last })
})


export const deleteUser = errorHandler(async (req, res, next)=>{
        let user = req.user
        if (!user) {
                next(new ErrorStatus('wrong data' , 500))
        }
        let data = await User.findOneAndDelete({_id: user._id})
        return res.status(200).json({ msg: 'done' , data})
})


export const updateUser = errorHandler(async (req, res, next)=>{
        let user = req.user
        if (!user) {
                next(new ErrorStatus('wrong data' , 500))
        }
        let { name, email, password } = req.body
        if(email !== user.email ){
                let OTP = Math.ceil(Math.random() * (9999 - 1000) + 1000)
                let data = await main(email, OTP, name)
                req.body.verifyed = false
        }
        let updatedUser = await User.findOneAndUpdate({_id: user._id},req.body,{new:true})
        return res.status(200).json({ msg: 'done' , updatedUser})
})

export const updatePassword = errorHandler(async (req, res, next)=>{
        let user = req.user
        if (!user) {
                next(new ErrorStatus('wrong data' , 500))
        }
        let {oldPassword , newPassword } = req.body
        let hashedOldPassword = await bcrypt.compare(oldPassword, user.password)
        if(!hashedOldPassword) next(new ErrorStatus('wrong password',401))
        let hashedPassword = await bcrypt.hash(newPassword, 8)
        let updatedUser = await User.findOneAndUpdate({_id: user._id},{password:hashedPassword},{new:true})
        return res.status(200).json({ msg: 'done' , updatedUser})
})
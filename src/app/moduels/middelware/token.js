import User from "../../../DB/models/user.model.js"
import jwt from 'jsonwebtoken'
import { ErrorStatus } from "../../utils/errorStatus.js"
import dotenv from 'dotenv'
import errorHandler from "../../utils/errorHandler.js"
dotenv.config()

 const token = errorHandler( async (req, res, next) => {
    let {token} = req.headers
    if (!token) next(new ErrorStatus("Token not provided", 401))

    let barer = token.split(' ')[0] == process.env.BARER
    if (!barer) next(new ErrorStatus("un matched token", 401))

    let lastToken = token.split(' ')[1]
    if (!lastToken) next(new ErrorStatus("wrong token"), 401);
    let decodedToken = jwt.verify(lastToken, process.env.JWT_SECRET)

    let user = await User.findOne({_id:decodedToken.id})
    if (!user) next(new ErrorStatus("un authenticated user", 401))

    req.user = user
    next()
})

export default token
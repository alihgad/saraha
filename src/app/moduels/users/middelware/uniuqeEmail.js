import User from "../../../../DB/models/user.model.js";
import errorHandler from "../../../utils/errorHandler.js";
import { ErrorStatus } from "../../../utils/errorStatus.js";

const uniuqeEmail = errorHandler(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user) next()
    else {
        next(new ErrorStatus("Email already exists"))
    }
})


export default uniuqeEmail
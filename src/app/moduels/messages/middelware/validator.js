import errorHandler from "../../../utils/errorHandler.js";
import schema from "./validationSchema.js";

let validators = errorHandler(async (req,res,next)=>{
    const {error} = await schema.body.validateAsync(req.body)
    
    if(error) {
        next(error.details)
    } else {
        next()
    }
})

export default validators;
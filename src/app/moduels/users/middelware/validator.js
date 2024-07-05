import errorHandler from "../../../utils/errorHandler.js";
import schema from "../validationSchema.js";


let validator = errorHandler(async (req, res, next) => {
    let errors = []
    let schemaContent = Object.keys(schema)
    schemaContent.map((key, i) => {
        if (req[key]) {
            let { error } = schema[key].validate(req[key], { abortEarly: false })
            if (error) {
                 errors.push(...error.details.map((err)=>{
                    return err.message
                 })) 


            }
        }
    })

    if (errors.length) {
        res.status(400).json({
            errors
        })
    } else {
        next()
    }

})


export default validator
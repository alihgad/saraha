import Joi from "joi";

let schema = {
    body : Joi.object({
        content : Joi.string().min(3).max(200).required(),
        email: Joi.string().required()
    })
}

export default schema;
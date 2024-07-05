import Joi from "joi";

let schema = {
    body : Joi.object({
        name : Joi.string().min(3).max(50).required(),
        email : Joi.string().email().required(),
        password : Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required().messages({'string.pattern.base':`At least 8 characters long  one uppercase letter  one lowercase letter one number one special character`}),
        confirmPassword : Joi.string().equal(Joi.ref('password')).required()
    })
}

export default schema;
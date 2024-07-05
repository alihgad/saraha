import { default as mongoose } from "mongoose";


let userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    otp: String,
    verifyed : {
        type: Boolean,
        default: false
    }
})

let User = mongoose.model("User", userSchema);

export default User;
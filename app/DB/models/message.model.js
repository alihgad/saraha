import mongoose from "mongoose";

let messageSchema = mongoose.Schema({
    content: String,
    receiverId: {
    type: String,
    ref: 'User'

}
})

let Message = mongoose.model("Message", messageSchema);

export default Message;

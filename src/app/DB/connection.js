import { default as mongoose } from "mongoose";

let connect = async ()=>{
    return await mongoose.connect('mongodb://127.0.0.1:27017/saraha').then(()=>{
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
}


export default connect
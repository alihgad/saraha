import { default as mongoose } from "mongoose";

let connect = mongoose.connect('mongodb://localhost:27017/saraha').then(()=>{
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});


export default connect
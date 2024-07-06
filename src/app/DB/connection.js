import mongoose from "mongoose";;

let connect = async ()=>{
    return await mongoose.connect('mongodb+srv://alihgad2:w3rlw2u4YMO785xE@bookshub.4uutypb.mongodb.net/assignment-8').then(()=>{
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
}


export default connect
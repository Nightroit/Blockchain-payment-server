import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
    userName: String, 
    email: String, 
    password: String,
    uniqueId: Number,  
    _id: String,
}); 


const userModel = mongoose.model('users', userSchema); 
export default userModel; 
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: [true , "Please provide a name "]
    },
    lastName:{
        type: String,
        required: [true , "Please provide a name "]
    },
    password:{
        type: String,
        required: [true , "Please provide a password "]
    },
    email:{
        type : String,
        required : [true , "Please provide a email "],
        unique : true
    },
    mobile : Number,
    address: String,
    isAdmin : {
        type: Boolean,
        default : false
    }
})

const User = mongoose.model('User' , userSchema)
export default User

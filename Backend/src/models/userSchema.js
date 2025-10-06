import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name:{
      type:String,
      required:true
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password:{
      type:String,
      required:true,
      minLength:6
    },
    phoneNumber:{
      type:String
    },
    role: {
      type: String,
      required: true,
      default: "User",
      enum: ["User", "Admin"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timstamps: true }
);

const Users = mongoose.model("Users", userSchema);

export default Users;

//example data
// {
//     "_id":"64fa4e3a8f2c1b0a7d1f9f33",
//     "name":"example",
//     "email":"example@gmail.com",
//     "password":"example",
//     "role":"Admin",
//     "isActive":true
// }

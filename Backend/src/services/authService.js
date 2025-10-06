import Users from "../models/userSchema.js";


export const findEmailService = async(data)=>{
    const findEmail = await Users.findOne({email:data.email})
    return findEmail;
}

export const findNameService = async(data)=>{
    const findName = await Users.findOne({name:data.name})
    return findName;
}

export const findPhoneNumberService = async(data)=>{
    const findPhoneNumber = await Users.findOne({phoneNumber:data.phoneNumber})
    return findPhoneNumber
}

export const postUserService = async(data)=>{
    const newUser = await Users.create({
        name:data.name,
        email:data.email,
        password:data.password,
        phoneNumber:data.phoneNumber
    })
    return newUser;
}
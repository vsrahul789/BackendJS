import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendCookie } from "../utils/features.js"
import { isAuthenticated } from "../middlewares/auth.js"
import ErrorHandler from "../middlewares/error.js"

export const getUserAll = async (req, res) => {

    try {
        const users = await User.find({})
    res.json({
        success: true,
        users: users,
    })
    } catch (error) {
        next(error)
    }
}

export const getUserByID = async (req, res) => { //this is a Dynamic routing here "/userid/" is static and ":id" is dynamic
    try {
        const { id } = req.params
    const user = await User.findById(id);
    console.log(req.params)
    res.json({
        success: true,
        user,
    })
    } catch (error) {
        error
    }
}
export const updateUser = async (req, res) => { //this is a Dynamic routing here "/userid/" is static and ":id" is dynamic
    const { id } = req.params
    const user = await User.findById(id);

    res.json({
        success: true,
        message: "Updated",
    })
}
export const deleteUser = async (req, res) => { //this is a Dynamic routing here "/userid/" is static and ":id" is dynamic
    const { id } = req.params
    const user = await User.findById(id);

    // await user.remove()
    res.json({
        success: true,
        message: "Deleted",
    })
}

export const createNewUser = async (req, res) => {

    try {
        const { name, email, password } = req.body
    let user = await User.findOne({ email })

    if(user) return next(new ErrorHandler("User already exist",404))

    const hashedPassword = await bcrypt.hash(password, 10)


    user = await User.create({ name, email, password: hashedPassword })
    sendCookie(user, res, "Registered Successfully", 201)
    } catch (error) {
        error
    }
}

export const existingUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email }).select("+password")

        if(!user) return next(new ErrorHandler("Invalid email or password",400))

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return next(new ErrorHandler("Invalid email or password",404))


        sendCookie(user, res, `Welcome Back ${user.name}`, 201)
    } catch (error) {
        next(error)
    }
}

export const getMyProfile = (req,res)=>{
    isAuthenticated()

    res.status(200).json({
        success: true,
        user:req.user,
    })
}

export const logout = (req,res)=>{
    res.status(200).cookie("token","",
    {
        expires:new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        user:req.user,
    })
}
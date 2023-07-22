import { User } from "../models/user.js"

export const getUserAll =  async(req,res)=>{

    const users = await User.find({})
    res.json({
        success:true,
        users:users,
    })
}

export const getUserByID = async (req,res)=>{ //this is a Dynamic routing here "/userid/" is static and ":id" is dynamic
    const {id} = req.params
    const user = await User.findById(id);
    console.log(req.params)
    res.json({
        success:true,
        user,
    })
}
export const updateUser = async (req,res)=>{ //this is a Dynamic routing here "/userid/" is static and ":id" is dynamic
    const {id} = req.params
    const user = await User.findById(id);

    res.json({
        success:true,
        message:"Updated",
    })
}
export const deleteUser = async (req,res)=>{ //this is a Dynamic routing here "/userid/" is static and ":id" is dynamic
    const {id} = req.params
    const user = await User.findById(id);
    
    // await user.remove()
    res.json({
        success:true,
        message:"Deleted",
    })
}

export const createNewUser =  async(req,res)=>{

    const {name,email,password}=req.body
    console.log(req.query)

    await User.create({
        name,
        email,
        password,
    })
    res.status(201).cookie("tempi","lol").json({
        success:true,
        message:"Registered Successfully"
    })
}

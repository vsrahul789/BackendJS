
// Express

import express from "express";
import path from "path"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { nextTick } from "process";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { name } from "ejs";

mongoose.connect("mongodb://localhost:27017/",{
    dbName:"backend"
}).then(()=>console.log("DataBase Connected"))
.catch((e) => console.log(e))

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const User = mongoose.model("User",userSchema);

const app = express();

const users = []

// Using Middlewares
app.use(express.static(path.join(path.resolve(), "public"))) // Static HTML
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

const isAuthenticated = async(req,res,next) => {
    const {token} = req.cookies;
    if(token){
        const decoded = jwt.verify(token , "martingarrixandavicii")
        req.user = await User.findById(decoded._id)
        next()
    }else{
        res.redirect("/login")
    }
}

// setting up view engine
app.set("view engine","ejs")

app.get('/', isAuthenticated , (req,res)=>{
    // RunTime HTML 
    // const {token} = req.cookies;
    // if(!token){
    //     res.render("login")
    // }else{
    //     res.render("logout")
    // }
    // console.log(req.user)

    res.render("logout",{name:req.user.name})
    console.log(req.user)
})

app.get('/',(req,res)=>{
    // res.redirect("/")

    res.render("login")
    // console.log(req.user)
})

app.get("/register", (req, res) => {
    res.render("register");
  });
 
app.get("/login" , (req,res)=>{
    res.render("login")
})

app.post("/login", async (req,res) =>{
    console.log(req.body)
    const {email , password} = req.body
    let user = await User.findOne({email})
    if(!user){
        return res.redirect('/register')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.render("login",{email , message:"Incorrect password"})
    }
    const token = jwt.sign({ _id: user._id }, "martingarrixandavicii");
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
      });
      res.redirect("/");
})


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    let user = await User.findOne({ email });
    if (user) {
      return res.redirect("/login");
    }

    const hashedPassword = await bcrypt.hash(password,10)
  
    user = await User.create({
      name,
      email,
      password:hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, "martingarrixandavicii");

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
})



app.post("/logout", (req,res) =>{
    res.cookie("token", null , {
        httpOnly:true , expires:new Date(Date.now())
    })
    res.redirect("/")
})


app.listen(5000 , () => {
    console.log("Server is working!");
})
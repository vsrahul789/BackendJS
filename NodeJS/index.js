// const http = require("http")
// console.log(http)
// const gfName = require("./features")

import http from "http"

// import gfName , {gfName2,gfName3} from "./features.js"

// import * as MyObj from "./features.js"
// console.log(MyObj.gfName1)

import { lovePercentage } from "./features.js"
// console.log(lovePercentage())

import fs from "node:fs"
const home = fs.readFile("./index1.html",() =>{
    console.log("File Read")
    // console.log(home) -> runs after the "Server is Working" bcuz its a async function hence the message is printed first and the the "File Read"
})



const server = http.createServer((req,res) => {
    if(req.url === "/about"){
        res.end(`<h1>Love Percentage is ${lovePercentage()}</h1>`)
    }
    if(req.url === "/"){
        // res.end("<h1>Home Page</h1>")
        
    }
    else if(req.url === "/contact"){
       res.end("<h1>Contact Page</h1>")
    }
    else if(req.url === "/gallary"){
        res.end("<h1>Gallary Page</h1>")
    // }else{
    //     res.end("<h1>404 Page not Found</h1>")
    }
})

server.listen(5000 , () => {
    console.log("Server is working")
})
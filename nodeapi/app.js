// try to keep Dynamic route at the end of your code

import express from "express";
import ejs from "ejs";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js"
import { config } from "dotenv";

config({
    path:"./data/config.env"
})

export const app = express()
// Using Middleware
app.use(express.json())
app.use("/users", userRouter)



app.get("/", (req, res) => {
    res.send("<h1>Nice Working.js</h1>")
})



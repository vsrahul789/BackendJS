// try to keep Dynamic route at the end of your code

import express from "express";
import ejs from "ejs";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
    path:"./data/config.env"
})

export const app = express()
// Using Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))

// Routers
app.use("/api/v1/users", userRouter)
app.use("/api/v1/task", taskRouter)



app.get("/", (req, res) => {
    res.send("<h1>Nice Working.js</h1>")
})

// Using Error Middleware
app.use(errorMiddleware)
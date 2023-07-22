import express from "express";
import { User } from "../models/user.js"
import { createNewUser, deleteUser, getUserAll, getUserByID, updateUser } from "../controller/user.js";

const router = express.Router()

router.get("/all", getUserAll)

// router.get("/:id",getUserByID)
router.route("/userid/:id").get(getUserByID).put(updateUser).delete(deleteUser)

router.post("/new", createNewUser)


export default router

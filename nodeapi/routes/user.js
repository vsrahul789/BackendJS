import express from "express";
import { User } from "../models/user.js"
import { createNewUser, deleteUser, getUserAll, getUserByID, updateUser,existingUser, getMyProfile, logout } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.get("/all", getUserAll)

// router.get("/:id",getUserByID)
router.route("/userid/:id").get(getUserByID).put(updateUser).delete(deleteUser)
router.route("/me").get(isAuthenticated , getMyProfile)

router.post("/new", createNewUser)
router.post("/login", existingUser)
router.get("/logout", logout)


export default router

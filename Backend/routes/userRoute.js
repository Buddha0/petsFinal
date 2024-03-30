import express from "express";
import { login, register, userData, getLoggedInUser, logout } from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js"

const router = express.Router();

router.post("/user/register", register)
router.get("/user/allUsers", userData)
router.post("/user/login", login)
router.get("/user/loggedinuser", isAuthorized, getLoggedInUser)
router.get("/user/logout", isAuthorized, logout)

export default router;
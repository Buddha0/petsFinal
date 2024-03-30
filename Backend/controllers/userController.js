import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js";
import { createError, errorHanlder } from "../middlewares/errorHandling.js";
import { user } from "../models/userModel.js";
import { getToken } from "../utils/token.js";

export const userData = asyncErrorHandling(async (req, res) => {
    const users = await user.find()
    res.send({
        success: true,
        users
    })
})

export const register = asyncErrorHandling(async (req, res) => {
    const { firstname, lastname, number, email, password, confirmPassword, role } = req.body

    if (!firstname || !lastname || !number || !email || !password || !confirmPassword || !role) return errorHanlder(createError("you cannot leave any of these empty"), req, res)

    const ifExists = await user.findOne({ email })

    if (ifExists) return errorHanlder(createError("this email already exists"), req, res)

    const newUser = await user.create({
        firstname, lastname, number, email, password, confirmPassword, role
    })
    getToken(newUser, 200, res, "registration and token generation successfull")
})


export const login = asyncErrorHandling(async (req, res) => {
    const { email, password, role } = req.body

    if (!email || !password || !role) return errorHanlder(createError("User info not found"), req, res)

    const userInfo = await user.findOne({ email }).select("+password")
    if (!userInfo) return errorHanlder(createError("User not Found"), req, res)

    const confirmPass = await userInfo.comparePassword(password)
    if (!confirmPass) {
        return errorHanlder(createError("email or password is incorrect"), req, res)
    }
    console.log(req.user)

    getToken(userInfo, 200, res, "login and token generation successfull")
})

export const getLoggedInUser = asyncErrorHandling(async (req, res) => {
    const loggedInUser = await req.user
    console.log(req.user)
    res.send({
        success: true,
        loggedInUser
    })
})

export const logout = asyncErrorHandling(async (req, res) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "logged out",
    })
})
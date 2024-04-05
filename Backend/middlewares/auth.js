import { asyncErrorHandling } from "../middlewares/asyncErrorHandler.js"
import { errorHanlder, createError } from "../middlewares/errorHandling.js"
import jwt from "jsonwebtoken";
import { user } from "../models/userModel.js"

export const isAuthorized = asyncErrorHandling(async (req, res, next) => {

    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization;
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }
    console.log("this is token", token)

    if (!token) {
        return errorHanlder(createError("You are not authorized", 400), req, res);
    }

    try {
        const decodedId = jwt.verify(token, process.env.JWT_KEY);
        req.user = await user.findById(decodedId.id);
        console.log("Retrieved user data:", req.user);
        next();
    } catch (error) {
        console.error("Authorization error:", error);
        if (error.name === 'JsonWebTokenError') {
            return errorHanlder(createError("Invalid token", 401), req, res);
        } else {
            return errorHanlder(createError("Internal Server Error", 500), req, res);
        }
    }
});

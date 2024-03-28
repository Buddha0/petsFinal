import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "you cannot leave this empty"],
        minLength: [3, "name cannot be this short"],
        maxLength: [25, "name cannot be this long"]
    },
    email: {
        type: String,
        required: [true, "you cannot leave this empty"],
        validate: [validator.isEmail, "invalid email"]
    },
    password: {
        type: String,
        required: [true, "you cannot leave this empty"],
        select: false
    },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

userSchema.methods.comparePassword = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXP
    });
};

export const user = mongoose.model("users", userSchema)

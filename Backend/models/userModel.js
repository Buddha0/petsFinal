import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "you cannot leave this empty"],
        minLength: [3, "first name cannot be this short"],
        maxLength: [25, "first name cannot be this long"]
    },
    lastname: {
        type: String,
        required: [true, "you cannot leave this empty"],
        minLength: [3, "last name cannot be this short"],
        maxLength: [25, "last name cannot be this long"]
    },
    number: {
        type: Number,
        required: [true, "you cannot leave this empty"],
        min: [10000000, "number cannot be this short"],
        max: [9999999999, "number cannot be this long"]
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
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value) {
                return this.password === value;
            },
            message: "Passwords do not match"
        }
    },
    profile: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
});

userSchema.methods.comparePassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
};

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXP
    });
};

export const user = mongoose.model("User", userSchema);

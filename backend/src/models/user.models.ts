import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { SALT } from "../constants";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "user name is required"],
            trim: true,
            lowercase: true,
            index: true,
        },
        
        email: {
            type: String,
            required: [true, "email must be required"],
            trim: true,
            lowercase: true,
            index: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

// -------------hash the password before save---------------
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const hash = bcrypt.hashSync(this.password, SALT);
    this.password = hash;
    next();
});

// ---------------validate the password---------------------
userSchema.methods.isPasswordCorrect = async function(password: string){
    return await bcrypt.compare(password, this.password)
}

// -------------generate access token method or middleware----------------
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET || "SECRET",
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// -------------generate refresh token method or middleware----------------
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET || "SECRET",
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = model("User", userSchema);

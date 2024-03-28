import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { UserInfer, loginInfer, tokenPayloadInfer } from "../@types";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.models";
import { ApiResponse } from "../utils/ApiResponse";
// import { generateToken } from "../utils/generateToken";
import bcrypt from "bcryptjs";



interface TypedRequest<T> extends Request {
    body: T;
    files: any;
}

// -------------defined user register or signup controller------------------
export const registerUser = asyncHandler(
    async (req: TypedRequest<UserInfer>, res: Response, next: NextFunction) => {
        // get user details from frontend
        const { username, email, password } = req.body;

        // validation - not empty
        if (
            [ username, email, password].some(
                (feild) => feild?.trim() === ""
            )
        ) {
            throw new ApiError(401, "Some fields are missing.");
        }

        // check if user already exists: userName, email
        const existUser: any = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existUser) throw new ApiError(409, "User already exist.");


        // create user object - create entry in db
        const user = await User.create({
            username,
            email,
            password,
        });

        // remove password and refresh token field from response
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        // check for user creation
        if (!createdUser) {
            throw new ApiError(500, "Failed, while creating user in DB.");
        }

        // return res
        return res
            .status(201)
            .json(
                new ApiResponse(
                    200,
                    createdUser,
                    "User registered successfully..."
                )
            );
    }
);
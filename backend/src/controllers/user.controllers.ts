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

const generateAccessAndRefereshTokens = async(userId: string) => {
    try {
        const user:any = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong, can't generate refresh token and access token")
    }
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
        const existUser: any = await User.findOne({email});

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


// ---------Login controller------------
export const loginUser = asyncHandler(
    async (req: Request, res: Response) => {
        const {email, password} = req.body

        if (!email && !password) {
            throw new ApiError(400, "email and password are required");
        }

        const user:any = await User.findOne({email})

        if (!user) {
            throw new ApiError(404, "User not exist");
        }

        const isCurrectPassword = await user.isPasswordCorrect(password);

        if (!isCurrectPassword) {
            throw new ApiError(401, "Invalid user credential");
        }

        const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
    }
);
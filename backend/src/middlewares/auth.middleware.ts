import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.models";

interface TypedRequest extends Request {
    user: {
        // _id: string;
        username: string;
        email: string;
    }
}

export const verifyJWT = asyncHandler(async(req: TypedRequest, _: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        console.log("JWT token :: "+token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)

        // console.log(decodedToken);
        
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        // console.log(user);
        
        req.user = user;
        next()
    } catch (error: any) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})
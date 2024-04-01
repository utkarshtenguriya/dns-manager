"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = exports.loginUser = exports.registerUser = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const user_models_1 = require("../models/user.models");
const ApiResponse_1 = require("../utils/ApiResponse");
const generateAccessAndRefereshTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_models_1.User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        yield user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, "Something went wrong, can't generate refresh token and access token");
    }
});
// -------------defined user register or signup controller------------------
exports.registerUser = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get user details from frontend
    const { username, email, password } = req.body;
    // validation - not empty
    if ([username, email, password].some((feild) => (feild === null || feild === void 0 ? void 0 : feild.trim()) === "")) {
        throw new ApiError_1.ApiError(401, "Some fields are missing.");
    }
    // check if user already exists: userName, email
    const existUser = yield user_models_1.User.findOne({ email });
    if (existUser)
        throw new ApiError_1.ApiError(409, "User already exist.");
    // create user object - create entry in db
    const user = yield user_models_1.User.create({
        username,
        email,
        password,
    });
    // remove password and refresh token field from response
    const createdUser = yield user_models_1.User.findById(user._id).select("-password -refreshToken");
    // check for user creation
    if (!createdUser) {
        throw new ApiError_1.ApiError(500, "Failed, while creating user in DB.");
    }
    // return successful response
    return res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(200, createdUser, "User registered successfully..."));
}));
// ---------Login controller------------
exports.loginUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email && !password) {
        throw new ApiError_1.ApiError(400, "email and password are required");
    }
    const user = yield user_models_1.User.findOne({ email });
    if (!user) {
        throw new ApiError_1.ApiError(404, "User not exist");
    }
    const isCurrectPassword = yield user.isPasswordCorrect(password);
    if (!isCurrectPassword) {
        throw new ApiError_1.ApiError(401, "Invalid user credential");
    }
    const { accessToken, refreshToken } = yield generateAccessAndRefereshTokens(user._id);
    const loggedInUser = yield user_models_1.User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: false,
        domain: "https://dns-manager-n39a.onrender.com",
        path: "/",
        sameSite: "none"
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse_1.ApiResponse(200, {
        user: loggedInUser, accessToken, refreshToken
    }, "User logged In Successfully"));
}));
exports.userAuth = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new ApiError_1.ApiError(400, "Failed authorization!");
    }
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, req.user));
}));
//# sourceMappingURL=user.controllers.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "user name is required"],
        trim: true,
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
}, { timestamps: true });
// -------------hash the password before save---------------
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        const hash = bcryptjs_1.default.hashSync(this.password, constants_1.SALT);
        this.password = hash;
        next();
    });
});
// ---------------validate the password---------------------
userSchema.methods.isPasswordCorrect = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
// -------------generate access token method or middleware----------------
userSchema.methods.generateAccessToken = function () {
    console.log(process.env.ACCESS_TOKEN_SECRET);
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPERY
    });
};
// -------------generate refresh token method or middleware----------------
userSchema.methods.generateRefreshToken = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPERY
    });
};
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.models.js.map
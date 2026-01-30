"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.registerUserService = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
/**
 * Register a new user
 */
const registerUserService = async (email, password) => {
    if (!email || !password) {
        const error = new Error('Email and password are required');
        error.status = 400;
        throw error;
    }
    if (password.length < 6) {
        const error = new Error('Password must be at least 6 characters');
        error.status = 400;
        throw error;
    }
    const existingUser = await User_1.User.findOne({ email });
    if (existingUser) {
        const error = new Error('Email already in use');
        error.status = 409;
        throw error;
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = new User_1.User({
        email,
        password: hashedPassword,
    });
    await user.save();
    return user;
};
exports.registerUserService = registerUserService;
/**
 * Login user and generate JWT
 */
const loginUserService = async (email, password) => {
    if (!email || !password) {
        const error = new Error('Email and password are required');
        error.status = 400;
        throw error;
    }
    const user = await User_1.User.findOne({ email });
    if (!user) {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }
    // 🔐 VALIDACIÓN CLAVE
    if (!env_1.JWT_SECRET) {
        const error = new Error('JWT secret not configured');
        error.status = 500;
        throw error;
    }
    const token = jsonwebtoken_1.default.sign({
        id: user._id.toString(),
        role: user.role,
    }, env_1.JWT_SECRET, { expiresIn: '1d' });
    return { user, token };
};
exports.loginUserService = loginUserService;
//# sourceMappingURL=authService.js.map
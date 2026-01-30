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
const registerUserService = async (email, username, password) => {
    if (!email || !username || !password) {
        const error = new Error('Email, username and password are required');
        error.status = 400;
        throw error;
    }
    // Password strength: min 8, upper, lower, number, special
    // Validar contraseña fuerte solo en registro
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!strongPassword.test(password)) {
        const error = new Error('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
        error.status = 400;
        throw error;
    }
    const existingEmail = await User_1.User.findOne({ email });
    if (existingEmail) {
        const error = new Error('Email already in use');
        error.status = 409;
        throw error;
    }
    const existingUsername = await User_1.User.findOne({ username });
    if (existingUsername) {
        const error = new Error('Username already in use');
        error.status = 409;
        throw error;
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = new User_1.User({
        email,
        username,
        password: hashedPassword,
    });
    await user.save();
    return user;
};
exports.registerUserService = registerUserService;
/**
 * Login user and generate JWT
 */
const loginUserService = async (identifier, // email or username
password) => {
    if (!identifier || !password) {
        const error = new Error('Email/username and password are required');
        error.status = 400;
        throw error;
    }
    // Buscar por email o username (case-sensitive)
    const user = await User_1.User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
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
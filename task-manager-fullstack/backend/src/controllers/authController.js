"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const authService_1 = require("../services/authService");
const registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await (0, authService_1.registerUserService)(email, password);
        res.status(201).json({ message: 'User registered successfully', user: { email: user.email, role: user.role, id: user._id } });
    }
    catch (error) {
        next(error);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await (0, authService_1.loginUserService)(email, password);
        res.status(200).json({ token, user: { email: user.email, role: user.role, id: user._id } });
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map
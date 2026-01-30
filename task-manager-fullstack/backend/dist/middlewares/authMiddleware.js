"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    // 👉 ESTA VALIDACIÓN ES LA CLAVE
    if (!token) {
        return res.status(401).json({ error: 'Malformed authorization header' });
    }
    if (!env_1.JWT_SECRET) {
        return res.status(500).json({ error: 'JWT secret not configured' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
        if (decoded && typeof decoded === 'object' && decoded.id && decoded.role) {
            req.user = {
                id: decoded.id,
                role: decoded.role,
            };
            return next();
        }
        return res.status(401).json({ error: 'Invalid token payload' });
    }
    catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map
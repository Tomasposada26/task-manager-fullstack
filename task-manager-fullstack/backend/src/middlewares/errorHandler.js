"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    let message = err.message || 'Internal Server Error';
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map((e) => e.message).join(', ');
    }
    // Duplicate key error
    if (err.code === 11000) {
        message = 'Duplicate value: ' + Object.keys(err.keyValue).join(', ');
    }
    res.status(status).json({ error: message });
}
//# sourceMappingURL=errorHandler.js.map
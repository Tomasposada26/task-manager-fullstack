"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const taskService_1 = require("../services/taskService");
const createTask = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const task = await (0, taskService_1.createTaskService)(userId, req.body);
        res.status(201).json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.createTask = createTask;
const getTasks = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { status, priority, page = '1', limit = '10' } = req.query;
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const result = await (0, taskService_1.getTasksService)(userId, status, priority, pageNum, limitNum);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getTasks = getTasks;
const getTaskById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const rawId = req.params.id;
        const taskId = Array.isArray(rawId) ? rawId[0] : rawId;
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }
        const task = await (0, taskService_1.getTaskByIdService)(userId, taskId);
        res.json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.getTaskById = getTaskById;
const updateTask = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const rawId = req.params.id;
        const taskId = Array.isArray(rawId) ? rawId[0] : rawId;
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }
        const task = await (0, taskService_1.updateTaskService)(userId, taskId, req.body);
        res.json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const rawId = req.params.id;
        const taskId = Array.isArray(rawId) ? rawId[0] : rawId;
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }
        await (0, taskService_1.deleteTaskService)(userId, taskId);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskController.js.map
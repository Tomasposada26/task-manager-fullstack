"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskService = exports.updateTaskService = exports.getTaskByIdService = exports.getTasksService = exports.createTaskService = void 0;
const Task_1 = require("../models/Task");
const createTaskService = async (userId, data) => {
    if (!data.title) {
        const error = new Error('Title is required');
        error.status = 400;
        throw error;
    }
    const task = new Task_1.Task({ ...data, user: userId });
    await task.save();
    return task;
};
exports.createTaskService = createTaskService;
const getTasksService = async (userId, status, priority, page = 1, limit = 10) => {
    const filter = { user: userId };
    if (status)
        filter.status = status;
    if (priority)
        filter.priority = priority;
    const skip = (page - 1) * limit;
    const [tasks, total] = await Promise.all([
        Task_1.Task.find(filter)
            .sort({ dueDate: 1, createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Task_1.Task.countDocuments(filter),
    ]);
    return {
        tasks,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};
exports.getTasksService = getTasksService;
const getTaskByIdService = async (userId, taskId) => {
    const task = await Task_1.Task.findOne({ _id: taskId, user: userId });
    if (!task) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
    }
    return task;
};
exports.getTaskByIdService = getTaskByIdService;
const updateTaskService = async (userId, taskId, data) => {
    const task = await Task_1.Task.findOneAndUpdate({ _id: taskId, user: userId }, data, { new: true });
    if (!task) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
    }
    return task;
};
exports.updateTaskService = updateTaskService;
const deleteTaskService = async (userId, taskId) => {
    const task = await Task_1.Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
    }
    return;
};
exports.deleteTaskService = deleteTaskService;
//# sourceMappingURL=taskService.js.map
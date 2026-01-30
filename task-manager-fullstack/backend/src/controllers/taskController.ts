import { Request, Response, NextFunction } from 'express';
import { createTaskService, getTasksService, getTaskByIdService, updateTaskService, deleteTaskService } from '../services/taskService';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const task = await createTaskService(userId, req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { status, priority, page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    const result = await getTasksService(userId, status as string, priority as string, pageNum, limitNum);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const rawId = req.params.id;
    const taskId = Array.isArray(rawId) ? rawId[0] : rawId;
    if (!taskId) {
      return res.status(400).json({ message: 'Task ID is required' });
    }
    const task = await getTaskByIdService(userId, taskId);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const rawId = req.params.id;
    const taskId = Array.isArray(rawId) ? rawId[0] : rawId;
    if (!taskId) {
      return res.status(400).json({ message: 'Task ID is required' });
    }
    const task = await updateTaskService(userId, taskId, req.body);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const rawId = req.params.id;
    const taskId = Array.isArray(rawId) ? rawId[0] : rawId;
    if (!taskId) {
      return res.status(400).json({ message: 'Task ID is required' });
    }
    await deleteTaskService(userId, taskId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

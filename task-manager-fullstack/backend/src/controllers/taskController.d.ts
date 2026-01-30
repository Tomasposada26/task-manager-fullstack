import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
export declare const createTask: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getTasks: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getTaskById: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateTask: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTask: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=taskController.d.ts.map
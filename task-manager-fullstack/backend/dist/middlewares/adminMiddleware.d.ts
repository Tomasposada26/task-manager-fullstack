import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
export declare const adminMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=adminMiddleware.d.ts.map
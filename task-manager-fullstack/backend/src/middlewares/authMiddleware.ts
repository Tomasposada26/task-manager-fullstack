import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // 👉 ESTA VALIDACIÓN ES LA CLAVE
  if (!token) {
    return res.status(401).json({ error: 'Malformed authorization header' });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'JWT secret not configured' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (decoded && typeof decoded === 'object' && decoded.id && decoded.role) {
      req.user = {
        id: decoded.id as string,
        role: decoded.role as string,
      };
      return next();
    }

    return res.status(401).json({ error: 'Invalid token payload' });
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

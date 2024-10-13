import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: any;
}


export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Token required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as CustomRequest).user = decoded;
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorizeTeacher = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = (req as CustomRequest).user;

  if (user?.role !== 'teacher') {
    res.status(403).json({ message: 'Access denied' });
    return;
  }
  next();
};

export const authorizeStudent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = (req as CustomRequest).user;

  if (user?.role !== 'student') {
    res.status(403).json({ message: 'Access denied' });
    return;
  }
  next();
};

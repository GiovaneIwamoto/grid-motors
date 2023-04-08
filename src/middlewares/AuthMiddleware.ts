import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken: any = jwt.verify(token!, 'secret');
        next();
    } catch (error) {
        res.status(401).json({
            error: new Error('Not Authorized!').message,
        });
    }
};

export const getUserIdFromToken = (token: string): string => {
    try {
        const decoded = jwt.verify(token, 'secret');
        const result = (decoded as any).id;
        return result;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export default authMiddleware;

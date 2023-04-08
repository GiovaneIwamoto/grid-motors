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

export default authMiddleware;

import { Router, Request, Response } from 'express';
import { ReservesController } from '../controllers';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const route = Router();
const reservesController = new ReservesController();

//---------- POST RESERVE ----------

route.post('/reserve', authMiddleware, (req: Request, res: Response) => {
    return reservesController.CreateReserve(req, res);
});

//---------- GET ALL RESERVES ----------

route.get('/reserve', authMiddleware, (req: Request, res: Response) => {
    return reservesController.GetAllReserves(req, res);
});

//---------- DELETE RESERVE BY ID ----------

route.delete('/reserve/:id', authMiddleware, (req: Request, res: Response) => {
    return reservesController.DeleteReserve(req, res);
});

//---------- UPDATE RESERVE BY ID ----------

route.put('/reserve/:id', authMiddleware, (req: Request, res: Response) => {
    return reservesController.UpdateReserve(req, res);
});

//---------- GET RESERVE BY ID ----------

route.get('/reserve/:id', authMiddleware, (req: Request, res: Response) => {
    return reservesController.GetReserve(req, res);
});

export default route;

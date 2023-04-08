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

//---------- UPDATE RESERVE BY ID ----------

//---------- GET RESERVE BY ID ----------

export default route;

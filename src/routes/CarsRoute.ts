import { Router, Request, Response } from 'express';
import { CarsController } from '../controllers';
// import { authMiddleware } from '../middlewares/AuthMiddleware'

const route = Router();
const carsController = new CarsController();

route.post('/car', (req: Request, res: Response) => {
    return carsController.CreateCar(req, res);
});

export default route;

import { Router, Request, Response } from 'express';
import { CarsController } from '../controllers';
// import { authMiddleware } from '../middlewares/AuthMiddleware'

const route = Router();
const carsController = new CarsController();

route.post('/car', (req: Request, res: Response) => {
    return carsController.CreateCar(req, res);
});

route.get('/car', (req: Request, res: Response) => {
    return carsController.GetAllCars(req, res);
});

route.delete('/car/:id', (req: Request, res: Response) => {
    return carsController.DeleteCar(req, res);
});

route.put('/car/:id', (req: Request, res: Response) => {
    return carsController.UpdateCar(req, res);
});

export default route;

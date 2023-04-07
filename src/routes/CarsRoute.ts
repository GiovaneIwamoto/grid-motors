import { Router, Request, Response } from 'express';
import { CarsController } from '../controllers';
// import { authMiddleware } from '../middlewares/AuthMiddleware'

const route = Router();
const carsController = new CarsController();

//---------- POST CAR ----------

route.post('/car', (req: Request, res: Response) => {
    return carsController.CreateCar(req, res);
});

//---------- GET ALL CARS ----------

route.get('/car', (req: Request, res: Response) => {
    return carsController.GetAllCars(req, res);
});

//---------- DELETE CAR BY ID ----------

route.delete('/car/:id', (req: Request, res: Response) => {
    return carsController.DeleteCar(req, res);
});

//---------- UPDATE CAR BY ID ----------

route.put('/car/:id', (req: Request, res: Response) => {
    return carsController.UpdateCar(req, res);
});

//---------- GET CAR BY ID ----------

route.get('/car/:id', (req: Request, res: Response) => {
    return carsController.GetCar(req, res);
});

//---------- UPDATE CAR ACCESSORY ----------

route.patch(
    '/car/:carId/accessories/:accessoryId',
    (req: Request, res: Response) => {
        return carsController.UpdateAccessories(req, res);
    }
);

export default route;

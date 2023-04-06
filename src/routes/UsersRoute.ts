import { Router, Request, Response } from 'express';
import { UsersController } from '../controllers';
// import { authMiddleware } from '../middlewares/AuthMiddleware'

const route = Router();
const usersController = new UsersController();

//---------- POST USER ----------

route.post('/user', (req: Request, res: Response) => {
    return usersController.CreateUser(req, res);
});

//---------- GET ALL USERS ----------

route.get('/user', (req: Request, res: Response) => {
    return usersController.GetAllUsers(req, res);
});

//---------- DELETE USER BY ID ----------

route.delete('/user/:id', (req: Request, res: Response) => {
    return usersController.DeleteUser(req, res);
});

//---------- UPDATE USER BY ID ----------
route.put('/user/:id', (req: Request, res: Response) => {
    return usersController.UpdateUser(req, res);
});

//---------- GET USER BY ID ----------
route.get('/user/:id', (req: Request, res: Response) => {
    return usersController.GetUser(req, res);
});

export default route;

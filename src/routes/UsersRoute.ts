import { Router, Request, Response } from 'express';
import { UsersController } from '../controllers';
// import { authMiddleware } from '../middlewares/AuthMiddleware'

const route = Router();
const usersController = new UsersController();

//---------- POST USER ----------
route.post('/user', (req: Request, res: Response) => {
    return usersController.createUser(req, res);
});
//---------- GET ALL USERS ----------

//---------- DELETE USER BY ID ----------

//---------- UPDATE USER BY ID ----------

//---------- GET USER BY ID ----------

export default route;

import fs from 'fs'
import userController from "../controller/userController.js";

let userRouter = {
    '/users': userController.showAllAcc,
    '/add-user': userController.showFormAdd,
    '/register-user': userController.showFormRegis,
}

export default userRouter;

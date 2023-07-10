import fs from 'fs'
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import homeController from "../controller/homeController.js";
import product2Router from "./product2Router.js";

let router = {
    '/index': homeController.showIndex,
    '/err': homeController.showErr,
    '/home':homeController.show,
}
router = {...router, ...productRouter};
router = {...router, ...product2Router};
router = {...router, ...userRouter};
export default router;

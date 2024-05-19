import { Router } from "express";
import userRouter from './user'
import productRouter from './product'
const router: Router = Router()


router.use(userRouter)
router.use(productRouter)



export default router;
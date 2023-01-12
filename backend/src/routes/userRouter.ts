import {Router} from "express";
import {login, profile, register} from "../controllers/userController";
import loginMiddleware from "../middlewares/loginMiddleware";

const userRouter: Router = Router();

userRouter.get(`/api/v1/user/profile`, loginMiddleware, profile);
userRouter.post(`/api/v1/user/login`, login);
userRouter.post(`/api/v1/user/register`, register);

export default userRouter;
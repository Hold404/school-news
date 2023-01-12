import {Router} from "express";
import reporterMiddleware from "../middlewares/reporterMiddleware";
import loginMiddleware from "../middlewares/loginMiddleware";
import {addView, createPost, deletePost, getAllPosts, getByID, updatePost} from "../controllers/postsController";

const postsRouter: Router = Router();

postsRouter.get(`/api/v1/posts/getAll`, getAllPosts);
postsRouter.get(`/api/v1/posts/getById/:id`, getByID);
postsRouter.patch(`/api/v1/posts/addView/:id`, loginMiddleware, addView);
postsRouter.post(`/api/v1/posts/create`, reporterMiddleware, createPost);
postsRouter.put(`/api/v1/posts/update/:id`, reporterMiddleware, updatePost);
postsRouter.delete(`/api/v1/posts/delete/:id`, reporterMiddleware, deletePost);

export default postsRouter;
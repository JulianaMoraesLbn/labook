import express from 'express'
import { UserController } from '../controller/UserController'


export const userRouter = express.Router()

const userController = new UserController()

userRouter.post("/signup", userController.signup) /* Cadastrar usuario - ok*/
userRouter.post("/login", userController.login) /* Login - ok */
userRouter.post("/:emailFriend", userController.friendship) /* Fazer amizade - ok */
userRouter.delete("/:id_friend", userController.unfriend) /* Desfazer amizade - ok */
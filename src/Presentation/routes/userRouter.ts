import express from 'express'
import { UserBusiness } from '../../Core/business/UserBusiness'
import { UserDataBase } from '../../Infraestruture/data/UserDataBase'
import { IdGenerator } from '../../Infraestruture/services/generateId'
import {HashManager} from '../../Infraestruture/services/HashManager'
import {TokenManager} from '../../Infraestruture/services/TokenGenerator'
import { UserController } from '../controller/UserController'


export const userRouter = express.Router()

const userDataBase = new UserDataBase()
const userBusiness = new UserBusiness(userDataBase, new IdGenerator, new HashManager, new TokenManager)
const userController = new UserController(userBusiness)

userRouter.post("/signup", userController.signup) /* Cadastrar usuario - ok*/
userRouter.post("/login", userController.login) /* Login - ok */
userRouter.post("/:emailFriend", userController.friendship) /* Fazer amizade - ok */
userRouter.delete("/:id_friend", userController.unfriend) /* Desfazer amizade - ok */
import express from 'express'
import { PostBusiness } from '../../Core/business/PostBusiness'
import { PostController } from '../controller/PostController'
import { IdGenerator } from '../../Infraestruture/services/generateId'
import { TokenManager } from '../../Infraestruture/services/TokenGenerator'
import { PostDataBase } from '../../Infraestruture/data/PostDataBase'
import { UserDataBase } from '../../Infraestruture/data/UserDataBase'

export const postRouter = express.Router()

const postDataBase = new PostDataBase()
const userDataBase = new UserDataBase()
const postBusiness = new PostBusiness(new IdGenerator, new TokenManager, postDataBase, userDataBase)
const postController = new PostController(postBusiness, new TokenManager, postDataBase)

postRouter.get("/feed", postController.feedByUser) /* Feed do usuário - visualiza o post dos amigos - ok*/
postRouter.get("/:id", postController.getPostId) /* Retorna um post passando o id do post */
postRouter.get("/feedtype", postController.feedByType) /* Feed por tipo de post - ok */
postRouter.post("/", postController.createPost) /* Criar um post - ok */
postRouter.post("/coment", postController.createCommentPost) /* Criar um comentário no post - ok */
postRouter.post("/like", postController.postLike) /* Dar um like no post - ok*/
postRouter.delete("/unlike", postController.postUnlike) /* desfazer like - ok*/

/* Documentação no postman https://documenter.getpostman.com/view/17932380/2s7Z13jNaS */
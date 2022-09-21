import express from 'express'
import { PostController } from '../controller/PostController'


export const postRouter = express.Router()
const postController = new PostController()

postRouter.get("/feed", postController.feedByUser) /* Feed do usuário - visualiza o post dos amigos - ok*/
postRouter.get("/:id", postController.getPostId) /* Retorna um post passando o id do post */
postRouter.get("/feedtype", postController.feedByType) /* Feed por tipo de post - ok */
postRouter.post("/", postController.createPost) /* Criar um post - ok */
postRouter.post("/coment", postController.createComentarioPost) /* Criar um comentário no post - ok */
postRouter.post("/like", postController.postLike) /* Dar um like no post - ok*/
postRouter.delete("/unlike", postController.postUnlike) /* desfazer like - ok*/

/* Documentação no postman https://documenter.getpostman.com/view/17932380/2s7Z13jNaS */
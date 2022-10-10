import "express-async-errors"
import app from './Presentation/controller/app'
import { NextFunction, Request, Response } from "express"
import { userRouter } from "./Presentation/routes/userRouter"
import { postRouter } from "./Presentation/routes/postRouter"



app.use("/user", userRouter)
app.use("/post", postRouter)

//quando ocorrer um erro nas rotas, cairá aqui
//assim não é preciso repetir o mesmo cacth em todas as 
//chamadas do controller

 app.use((err:any, req: Request, res: Response)=>{
    console.log("err no index", err)
    res.status(err.statusCode).send('qualquer coisa')
})
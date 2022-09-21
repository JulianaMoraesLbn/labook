import app from './Presentation/controller/app'
import { userRouter } from "./Presentation/routes/userRouter"
import { postRouter } from "./Presentation/routes/postRouter"


app.use("/user", userRouter)
app.use("/post", postRouter)


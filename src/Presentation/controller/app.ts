import cors from 'cors'
import express, {Express} from 'express'
import { AddressInfo } from "net"

const app: Express = express()
app.use(express.json())
app.use(cors())

const server = app.listen(process.env.PORT || 3003, ()=>{
    if(server){
        const address = server.address() as AddressInfo
        console.log('Servidor de pé')
    } else {
        console.error('O servidor falhou')
    }
})

export default app
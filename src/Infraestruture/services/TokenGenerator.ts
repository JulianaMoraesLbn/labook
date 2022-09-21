import * as jwt from 'jsonwebtoken'
import { AuthenticationData } from '../../Core/entities/User'


export class TokenManager {

    public generateToken = (id: string) =>{
        console.log("id - token", id)
        const token = jwt.sign(
            {id},
            process.env.JWT_KEY as string,
            { expiresIn: "1h"}
        )
        
        return token
    }

    /**** VERIFICA SE O TOKEN É VERDADEIRO /// RECEBE O TOKEN E A SENHA DE SEGURANÇA (senha do back end q esta no env)****/

    public getTokenData = (token: string): AuthenticationData => {
        const payload = jwt.verify(
            token,
            process.env.JWT_KEY as string
        ) as jwt.JwtPayload

        return {id: payload.id as string}
    }
}
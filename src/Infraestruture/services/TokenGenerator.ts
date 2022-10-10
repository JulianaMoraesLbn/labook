import * as jwt from 'jsonwebtoken'
import { ITokenManager } from '../../Core/business/ports/repository/repositories/repositoriesServices'
import { AuthenticationData } from '../ports/repository/dtos/dtoUser'


export class TokenManager implements ITokenManager{

    public generateToken = (id: string): string =>{

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
import { Request, Response } from "express"
import { UserBusiness } from "../../Core/business/UserBusiness"
import { InvalidEmail, InvalidId, InvalidToken, MissingInformation } from "../../Core/entities/customError"
import { FriendshipInputDTO, LoginInputDTO, SignupInputDTO, UnfriendInputDTO } from "../../Core/entities/User"


export class UserController {

    public signup = async (req: Request, res: Response):Promise<void> => {

        try {

            const { name, email, password } = req.body


            if (!name || !email || !password) {
                throw new MissingInformation
            }

            const input: SignupInputDTO = {
                name,
                email,
                password
            }

            const userBusiness = new UserBusiness()
            const tokenresult = await userBusiness.signup(input)

            res.status(201).send({ token: tokenresult })

        } catch (err: any) {
            res.status(err.statusCode).send(err.message)
        }
    }

    public login = async (req: Request, res: Response):Promise<void> => {

        try {

            const { email, password } = req.body

            if (!email || !password) {
                throw new MissingInformation
            }

            if (!email.includes("@")) {
                throw new InvalidEmail
            }

            const input: LoginInputDTO = {
                email,
                password
            }

            const loginBusiness = new UserBusiness()
            const token = await loginBusiness.login(input)

            res.status(200).send({ token: token })

        } catch (err: any) {
            res.status(err.statusCode).send(err.message)
        }
    }

    public friendship = async (req: Request, res: Response):Promise<void> => {
        /***pediu para fazer com id mas fiz com email */
        try {

            const { emailFriend } = req.params

            const token: string = req.headers.authorization as string
         

            if (!emailFriend) {
                throw new InvalidEmail
            }

            if (!token) {
                throw new InvalidToken
            }

            const input: FriendshipInputDTO = {
                emailFriend,
                token
            }

            await new UserBusiness().friendship(input)

            res.sendStatus(201)

        } catch (err: any) {
            res.status(err.statusCode).send(err.message)
        }



    }

    public unfriend = async (req: Request, res: Response):Promise<void> => {

        const {id_friend} = req.params 
        const token: string = req.headers.authorization as string

     

        if(!id_friend){throw new InvalidId}
        if(!token){throw new InvalidToken}

        const input: UnfriendInputDTO = {
            id_friend,
            token
        }

        await new UserBusiness().unfriend(input)

        res.sendStatus(200)   
    }
}
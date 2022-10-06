import { Request, Response } from "express"
import { InvalidEmail, InvalidId, InvalidToken, MissingInformation } from "../../Common/customError"
import { IUserBuseniss } from "../../Core/business/ports/repository/repositories/repositoriesUserBusiness"
import { FriendshipInputDTO, LoginInputDTO, SignupInputDTO, UnfriendInputDTO } from "./ports/repository/dtos/dtoUser"



export class UserController {

    /** está vindo da business */
    constructor(private iUserBuseniss: IUserBuseniss){}

    public signup = async (req: Request, res: Response):Promise<void> => {

        try {

            console.log("antes")
            const { name, email, password } = req.body
            console.log("depois")

            if (!name || !email || !password) {
                throw new MissingInformation
            }

            const input: SignupInputDTO = {
                name,
                email,
                password
            }

            const tokenresult = await this.iUserBuseniss.signup(input)

            res.status(201).send({ token: tokenresult })

        } catch (err: any) {
            console.log("status: ", err.statusCode)
            res.status(err.statusCode).send(err.message)
           /*  const retornoStatus = res.status(err.statusCode)
            retornoStatus */
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

            const token = await this.iUserBuseniss.login(input)

            res.status(200).send({ token: token })

        } catch (err: any) {
            console.log("controller login", err)
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

            await this.iUserBuseniss.friendship(input)

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

        await this.iUserBuseniss.unfriend(input)

        res.sendStatus(200)   
    }
}
import { GenericError, InvalidEmail, InvalidPassword } from "../../Common/customError";
import { FriendshipInputDataDTO, UnfriendInputDataDTO } from "./ports/repository/dtos/dtoUser";
import { AuthenticationData, FriendshipInputDTO, LoginInputDTO, SignupInputDTO, UnfriendInputDTO, User } from "./ports/repository/dtos/dtoUser";
import { IHashManager, IidGenerator, ITokenManager } from "./ports/repository/repositories/repositoriesServices";
import { IUserBuseniss, IUserDataBase } from "./ports/repository/repositories/repositoriesUserBusiness";



export class UserBusiness implements IUserBuseniss {

    constructor(
        private iUserDataBase: IUserDataBase,
        private idGenerator: IidGenerator,
        private iHashManager: IHashManager,
        private tokenManger: ITokenManager
    ) { }

    async signup(input: SignupInputDTO): Promise<string> {

        const { name, email, password } = input

        const id: string = await this.idGenerator.generateId()

        const cipherText = await this.iHashManager.generateHash(password)

        const token: string = await this.tokenManger.generateToken(id)

        const inputUser = {
            id,
            name,
            email,
            password: cipherText
        }

        await this.iUserDataBase.insertUser(inputUser)

        return token
    }

    public async login(input: LoginInputDTO): Promise<string> {

      
            const { email, password } = input
            console.log(email, password)

            const resultUser: User = await this.iUserDataBase.getUserEmail(email)

            console.log("aqui", resultUser)

            if (!resultUser) {
                console.log("entrou aqui")
                throw new InvalidEmail
            }

            const passwordIsCorrect: boolean = await this.iHashManager.compareHash(password, resultUser.password)

            if (!passwordIsCorrect) {
                throw new InvalidPassword
            }


            const token: string = await this.tokenManger.generateToken(resultUser.id)

            return token

    }

    public friendship = async (input: FriendshipInputDTO): Promise<void> => {

        const { emailFriend, token } = input

        const tokenPayloadId: AuthenticationData = await this.tokenManger.getTokenData(token)

        const resultUserFriend: User = await this.iUserDataBase.getUserEmail(emailFriend)

        const id: string = await this.idGenerator.generateId()

        const inputFriendData: FriendshipInputDataDTO = {
            id,
            id_user: tokenPayloadId.id,
            id_friend: resultUserFriend.id
        }

        await this.iUserDataBase.newFriendship(inputFriendData)

    }

    public unfriend = async (input: UnfriendInputDTO): Promise<void> => {

        const { id_friend, token } = input

        const tokenPayloadId: AuthenticationData = await this.tokenManger.getTokenData(token)

        const resultUserGetId = await this.iUserDataBase.getUserId(id_friend)

        if (!resultUserGetId.id) {
            throw new GenericError
        }

        const inputUnfriend: UnfriendInputDataDTO = {
            id_user: tokenPayloadId.id,
            id_friend
        }

        await this.iUserDataBase.unfriend(inputUnfriend)

    }

}
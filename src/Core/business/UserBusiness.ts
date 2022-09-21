import { UserDataBase } from "../../Infraestruture/data/UserDataBase";
import { IdGenerator } from "../../Infraestruture/services/generateId";
import { HashManager } from "../../Infraestruture/services/HashManager";
import { TokenManager } from "../../Infraestruture/services/TokenGenerator";
import { GenericError, InvalidEmail, InvalidPassword } from "../entities/customError";
import { AuthenticationData, FriendshipInputDataDTO, FriendshipInputDTO, LoginInputDTO, SignupInputDTO, UnfriendInputDataDTO, UnfriendInputDTO, User } from "../entities/User";


export class UserBusiness {

    async signup(input: SignupInputDTO): Promise<string> {

        const { name, email, password } = input

        const idGenarator = new IdGenerator()
        const id: string = idGenarator.generateId()

        /***** CRIPTOGRAFAR PASSWORD **** 15:45 VIDEO ******/
        const hashManager = new HashManager()
        const cipherText = await hashManager.generateHash(password)

        /*** gerando o token ***/
        const tokenManager = new TokenManager()
        const token: string = await tokenManager.generateToken(id)

        const inputUser = {
            id,
            name,
            email,
            password: cipherText
        }

        const userDataBase = new UserDataBase()
        await userDataBase.insertUser(inputUser)

        /***retorno o token, porque o front vai precisar para validar */
        return token
    }

    public async login(input: LoginInputDTO): Promise<string> {

        try {

            const { email, password } = input

            const userDataBase = new UserDataBase()
            const resultUser: User = await userDataBase.getUserEmail(email)

            if (!resultUser) {
                throw new InvalidEmail
            }

            const hashManager = new HashManager()
            const passwordIsCorrect: boolean = await hashManager.compareHash(password, resultUser.password)

            if (!passwordIsCorrect) {
                throw new InvalidPassword
            }

            const tokenManager = new TokenManager()
            const token: string = await tokenManager.generateToken(resultUser.id)

            return token

        } catch (err: any) {
            throw new Error
        }

    }

    public friendship = async (input: FriendshipInputDTO):Promise<void> => {

        const { emailFriend, token } = input

        const tokenPayloadId: AuthenticationData = await new TokenManager().getTokenData(token)
        const resultUserFriend: User = await new UserDataBase().getUserEmail(emailFriend)
        const id: string = await new IdGenerator().generateId()

        const inputFriendData: FriendshipInputDataDTO = {
            id,
            id_user: tokenPayloadId.id,
            id_friend: resultUserFriend.id
        }

        await new UserDataBase().newFriendship(inputFriendData)


    }

    public unfriend = async (input: UnfriendInputDTO):Promise<void> => {

        const { id_friend, token } = input

        const tokenPayloadId: AuthenticationData = await new TokenManager().getTokenData(token)

        const resultUserGetId = await new UserDataBase().getUserId(id_friend)

        if (!resultUserGetId.id) {
            throw new GenericError
        }

        const inputUnfriend: UnfriendInputDataDTO = {
            id_user: tokenPayloadId.id,
            id_friend
        }

        await new UserDataBase().unfriend(inputUnfriend)

    }

}
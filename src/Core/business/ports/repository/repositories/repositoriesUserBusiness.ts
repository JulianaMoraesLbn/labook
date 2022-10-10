import { LoginInputDTO, SignupInputDTO, FriendshipInputDTO, UnfriendInputDTO, User, FriendshipInputDataDTO, UnfriendInputDataDTO} from "../dtos/dtoUser";


export interface IUserBuseniss {
    signup:(input: SignupInputDTO)=>Promise<string>,
    login:(input: LoginInputDTO)=>Promise<string>,
    friendship:(input: FriendshipInputDTO)=>Promise<void>,
    unfriend:(input: UnfriendInputDTO)=>Promise<void>
}

export interface IUserDataBase {
    insertUser:(user: User)=>Promise<void>,
    getUserEmail:(email: string)=>Promise<User>,
    getUserId:(id: string)=>Promise<User>,
    newFriendship:(inputFriendData: FriendshipInputDataDTO)=>Promise<void>,
    unfriend:(inputFriendData: UnfriendInputDataDTO)=>Promise<void>,
    getAllFriendsById:(id: string)=>Promise<[]>,
    getIdFriends: (id:string)=>Promise<string[]>
}
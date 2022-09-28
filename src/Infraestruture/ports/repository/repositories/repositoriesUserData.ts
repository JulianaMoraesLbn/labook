import { FriendshipInputDataDTO, UnfriendInputDataDTO, User } from "../dtos/dtoUser";

export interface IUserDataBase {
    insertUser:(user: User)=>Promise<void>,
    getUserEmail:(email: string)=>Promise<User>,
    getUserId:(id: string)=>Promise<User>,
    newFriendship:(inputFriendData: FriendshipInputDataDTO)=>Promise<void>,
    unfriend:(inputFriendData: UnfriendInputDataDTO)=>Promise<void>,
    getAllFriendsById:(id: string)=>Promise<[]>,
    getIdFriends: (id:string)=>Promise<string[]>
}
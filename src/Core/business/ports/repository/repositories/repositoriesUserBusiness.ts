import { LoginInputDTO, SignupInputDTO, FriendshipInputDTO, UnfriendInputDTO} from "../dtos/dtoUser";


export interface IUserBuseniss {
    signup:(input: SignupInputDTO)=>Promise<string>,
    login:(input: LoginInputDTO)=>Promise<string>,
    friendship:(input: FriendshipInputDTO)=>Promise<void>,
    unfriend:(input: UnfriendInputDTO)=>Promise<void>
}